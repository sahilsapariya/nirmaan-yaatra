from django.db import models
from projects.models import Project

# Create your models here.
class Bills(models.Model):
    name = models.CharField(max_length=100, blank=True)
    amount = models.FloatField()
    date = models.DateField(auto_now_add=True)
    description = models.TextField()
    is_approved = models.BooleanField(default=False, blank=True)
    category = models.CharField(max_length=30, blank=True)
    status = models.CharField(max_length=20, blank=True, default="pending")
    dealer_name = models.CharField(max_length=100, blank=True)
    dealer_phone = models.CharField(max_length=20, blank=True)
    projects = models.ForeignKey(Project, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self) -> str:
        return self.name