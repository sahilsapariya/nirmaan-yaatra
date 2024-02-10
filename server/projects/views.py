from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from .models import Project
from .serializers import ProjectSerializer
from users.permissions import IsAdminOrContractor
from django.http import HttpResponse
from django.core.serializers import serialize
from bills.serializers import BillsSerializer
from collections import defaultdict


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
        if request.user.is_superuser:
            instance = self.get_object()
            serializer = self.get_serializer(instance)

             # Get details of contractors associated with the project
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

            # Get details of bills associated with the project
            bills_queryset = instance.bills_set.all()
            bill_data = defaultdict(list)
            for bill in bills_queryset:
                bill_category = bill.category
                bill_data[bill_category].append({
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

            # Combine contractors and bills by category
            site_details = []
            for category, contractor_info in contractor_data.items():
                site_details.append({
                    "category": category,
                    "contractor": contractor_info,
                    "bills": bill_data[category]
                })

            response_data = serializer.data
            response_data['site_details'] = site_details

            return Response(response_data)