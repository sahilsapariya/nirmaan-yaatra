from rest_framework import viewsets
from .models import Tasks
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer

    def get_queryset(self):
        project_id = self.kwargs.get('project_id')
        queryset = Tasks.objects.filter(project=project_id)

        return queryset
