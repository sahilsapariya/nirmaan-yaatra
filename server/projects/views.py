from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from .models import Project
from .serializers import ProjectSerializer
from users.permissions import IsAdminOrContractor
from django.http import HttpResponse

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAdminOrContractor]


    def list(self, request, *args, **kwargs):
        if request.user.is_superuser:
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            data = serializer.data

            for project_data in data:
                project = Project.objects.get(id=project_data['id'])
                contractors = project.contractor_set.all() 
                project_data['contractors'] = [
                    {
                        "id": contractor.id, 
                        "username":  contractor.username, 
                        "specialization": contractor.specialization
                    } for contractor in contractors
                ]
            return Response(data)
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
            contractor_data = [
                {
                    "id": contractor.id,
                    "username": contractor.username,
                    "specialization": contractor.specialization
                } for contractor in contractors
            ]

            response_data = serializer.data
            response_data['contractors'] = contractor_data

            return Response(response_data)