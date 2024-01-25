# views.py
from rest_framework import generics
from .models import Contractor
from .serializers import ContractorSerializer
from .permissions import IsAdminOrContractor

class ContractorRegistrationView(generics.ListCreateAPIView):
    queryset = Contractor.objects.all()
    serializer_class = ContractorSerializer
    permission_classes = [IsAdminOrContractor]

    def perform_create(self, serializer):
        # Set password for the contractor
        validated_data = serializer.validated_data
        password = validated_data.get('password')
        if password:
            contractor = serializer.save()
            contractor.set_password(password)  # Hash the password
            contractor.save()
        else:
            serializer.save()

    def get_queryset(self):
        return Contractor.objects.filter(is_superuser=False)


class ContractorDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contractor.objects.all()
    serializer_class = ContractorSerializer
    permission_classes = [IsAdminOrContractor]
