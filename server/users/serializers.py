# serializers.py
from rest_framework import serializers
from .models import Contractor

class ContractorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contractor
        fields = ['id', 'username', 'email', 'phone_number', 'first_name', 'last_name', 'address', 'specialization', 'password']
        extra_kwargs = {'password': {'write_only': True}}