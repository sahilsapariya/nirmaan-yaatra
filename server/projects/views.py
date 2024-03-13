from rest_framework import viewsets
from rest_framework.response import Response
from .models import Project
from .serializers import ProjectSerializer
from users.permissions import IsAdminOrContractor
from collections import defaultdict
from rest_framework.exceptions import NotFound
from rest_framework.exceptions import PermissionDenied


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAdminOrContractor]


    def list(self, request, *args, **kwargs):
        if request.user.is_superuser:
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)

            return Response(serializer.data)
        else:
            queryset = self.get_queryset().filter(contractor=request.user)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
        except Project.DoesNotExist:
            raise NotFound("Project not found")

        serializer = self.get_serializer(instance)

        if request.user.is_superuser:
            contractors = instance.contractor_set.all()
            contractor_data = {
                contractor.specialization: {
                    "id": contractor.id,
                    "username": contractor.username,
                    "specialization": contractor.specialization,
                    "name": contractor.name,
                    "email": contractor.email,
                    "phone_number": contractor.phone_number,
                    "description": "",
                    "img_url": contractor.img_url
                } for contractor in contractors
            }

            bills_queryset = instance.bills_set.all()
            task_queryset = instance.tasks_set.all()
        else:
            # Check if the current user is associated with the project as a contractor
            if not instance.contractor_set.filter(id=request.user.id).exists():
                raise PermissionDenied("You are not authorized to view this project.")
            
            # Retrieve bills and tasks associated with the current contractor
            bills_queryset = instance.bills_set.filter(contractor=request.user)
            task_queryset = instance.tasks_set.filter(contractor=request.user)

        # Serialize bills and tasks
        bill_data = defaultdict(list)
        for bill in bills_queryset:
            bill_data[bill.category].append({
                "id": bill.id,
                "name": bill.name,
                "amount": bill.amount,
                "date": bill.date,
                "description": bill.description,
                "is_approved": bill.is_approved,
                "status": bill.status,
                "dealer_name": bill.dealer_name,
                "dealer_phone": bill.dealer_phone
            })

        task_data = defaultdict(list)
        for task in task_queryset:
            task_data[task.category].append({
                "id": task.id,
                "name": task.name,
                "description": task.description,
                "start_date": task.start_date,
                "end_date": task.end_date,
                "is_complete": task.is_complete
            })

        site_details = []
        for category, contractor_info in contractor_data.items():
            site_details.append({
                "category": category,
                "contractor": contractor_info,
                "bills": bill_data[category],
                "tasks": task_data[category]
            })

        response_data = serializer.data
        response_data['site_details'] = site_details

        return Response(response_data)
