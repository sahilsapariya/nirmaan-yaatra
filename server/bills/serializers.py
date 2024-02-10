from rest_framework import serializers
from .models import Bills


class BillsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bills
        fields = '__all__'