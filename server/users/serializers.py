# serializers.py
from rest_framework import serializers
from .models import Contractor

class ContractorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contractor
        fields = ['id', 'username', 'email', 'phone_number', 'name', 'address', 'specialization', 'password', 'projects', 'img_url']
        extra_kwargs = {'password': {'write_only': True}}