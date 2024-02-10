from django.db import models
from projects.models import Project


class Tasks(models.Model):
    name = models.CharField(max_length=100, blank=True)
    description = models.TextField()
    start_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField(auto_now=True)
    is_complete = models.BooleanField(default=False)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.name
    
    