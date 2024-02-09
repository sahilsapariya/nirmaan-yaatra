from rest_framework import serializers
from .models import Project


class ProjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Project
        # fields = ['id', 'project_name', 'start_date', 'end_date', 'budget', 'status', 'description', 'img_url',
        #           'location',
        #           'client_name', 
        #           'client_number', 'client_email', 'client_address', 'client_city']
        fields = '__all__'

class ProjectDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Project
        fields = ['id', 'project_name', 'status', 'description', 'img_url', 'location']