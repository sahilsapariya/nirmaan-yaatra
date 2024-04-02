from rest_framework import serializers
from users.models import Contractor

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contractor
        fields = ["name", "id", "img_url"]
