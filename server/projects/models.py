from django.db import models

# Create your models here.

class Project(models.Model):
    project_name = models.CharField(max_length=100, blank=False)
    start_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField(auto_now=True)
    duration = models.IntegerField()
    