from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import ProfileSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims to the token
        token['userType'] = 'ADMIN' if user.is_staff else 'CONTRACTOR'

        return token
    

    def validate(self, attrs):
        data = super().validate(attrs)
        data['userType'] = 'ADMIN' if self.user.is_staff else 'CONTRACTOR'
        return data

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_user_profile(request):
    user = request.user
      # Assuming 'profile' is the related_name of the OneToOneField
    serializer = ProfileSerializer(user)
    return Response(serializer.data)