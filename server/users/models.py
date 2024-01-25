from django.db import models
from django.contrib.auth.models import AbstractUser


class Contractor(AbstractUser):
    email = models.EmailField(max_length=100, blank=False)
    phone_number = models.CharField(max_length=15, blank=False)
    first_name = models.CharField(max_length=100, blank=False)
    last_name = models.CharField(max_length=100, blank=False)
    address = models.TextField(blank=True)
    specialization = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"{self.username}"
