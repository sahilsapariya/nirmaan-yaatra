from rest_framework import viewsets
from .models import Bills
from .serializers import BillsSerializer

# Create your views here.

class BillsViewSet(viewsets.ModelViewSet):
    serializer_class = BillsSerializer

    def get_queryset(self):
        project_id = self.kwargs.get('project_id')
        queryset = Bills.objects.filter(projects=project_id)

        return queryset
