from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import ProfileSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_user_profile(request):
    user = request.user
      # Assuming 'profile' is the related_name of the OneToOneField
    serializer = ProfileSerializer(user)
    return Response(serializer.data)
