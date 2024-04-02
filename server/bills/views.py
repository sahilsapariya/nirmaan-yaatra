from rest_framework import viewsets
from .models import Bills
from .serializers import BillsSerializer
from users.permissions import IsAdminOrContractor

# Create your views here.

class BillsViewSet(viewsets.ModelViewSet):
    queryset = Bills.objects.all()
    serializer_class = BillsSerializer

