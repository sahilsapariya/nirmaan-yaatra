from django.db import models

# Create your models here.

class Project(models.Model):

    PROJECT_STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
    )


    project_name = models.CharField(max_length=100, blank=False)
    start_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField(auto_now=True)
    budget = models.FloatField(null=True)
    status = models.CharField(max_length=20, choices=PROJECT_STATUS_CHOICES, default='pending')

    
    def __str__(self) -> str:
        return self.project_name