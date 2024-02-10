from django.db import models
from projects.models import Project
from django.utils import timezone
from datetime import timedelta


class Tasks(models.Model):
    name = models.CharField(max_length=100, blank=True)
    description = models.TextField()
    start_date = models.DateField(default=timezone.now().date())
    end_date = models.DateField(null=True)
    is_complete = models.BooleanField(default=False)
    category = models.CharField(max_length=100, blank=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if not self.end_date:
            self.end_date = self.start_date + timedelta(days=3)
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.name
    
    