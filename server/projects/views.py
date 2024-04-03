from rest_framework import viewsets
from rest_framework.response import Response
from .models import Project
from .serializers import ProjectSerializer
from collections import defaultdict
from bills.models import Bills
from tasks.models import Tasks
from users.permissions import IsAdminOrContractor


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
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        contractor_data = {}

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

            bills_queryset = Bills.objects.filter(projects=instance)
            task_queryset = Tasks.objects.filter(project=instance)
        else:
            
            bills_queryset = instance.bills_set.all()
            task_queryset = instance.tasks_set.all()


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
