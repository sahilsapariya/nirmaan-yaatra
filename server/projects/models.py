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
    description = models.TextField(blank=True)
    img_url = models.TextField(blank=True)
    location = models.CharField(max_length=100, blank=True, default=None)
    city = models.CharField(max_length=100, blank=True)
    client_name = models.CharField(max_length=255, blank=True, default=None)
    client_number = models.CharField(max_length=255, blank=True, null=True, default=None)
    client_address = models.CharField(max_length=255, null=True, blank=True, default=None)
    client_city = models.CharField(max_length=255, blank=True, null=True, default=None)
    client_email = models.EmailField(max_length=255, blank=True, null=True, default=None)

    
    def __str__(self) -> str:
        return self.project_name