from django.db import models
from django.contrib.auth.models import AbstractUser
from projects.models import Project

class Contractor(AbstractUser):
    email = models.EmailField(max_length=100, blank=False)
    phone_number = models.CharField(max_length=15, blank=False)
    name = models.CharField(max_length=100, blank=True)
    address = models.TextField(blank=True)
    specialization = models.CharField(max_length=100, blank=True)
    projects = models.ManyToManyField(Project, blank=True)
    img_url = models.TextField(blank=True)

    def __str__(self):
        return f"{self.username}"
