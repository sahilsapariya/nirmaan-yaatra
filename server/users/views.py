# views.py
from rest_framework import generics
from .models import Contractor
from .serializers import ContractorSerializer
from .permissions import IsAdminOrContractor

class ContractorRegistrationView(generics.ListCreateAPIView):
    queryset = Contractor.objects.all()
    serializer_class = ContractorSerializer
    permission_classes = [IsAdminOrContractor]

    def get_queryset(self):
        return Contractor.objects.filter(is_superuser=False)


class ContractorDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contractor.objects.all()
    serializer_class = ContractorSerializer
    permission_classes = [IsAdminOrContractor]
