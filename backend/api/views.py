from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import login
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import Profile
from .serializers import UserSerializer, ProfileSerializer, UserRegistrationSerializer, UserLoginSerializer, PublicUserSerializer


@method_decorator(csrf_exempt, name='dispatch')
class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        return Response({
            'message': 'User registered successfully',
            'user_id': user.id,
            'username': user.username,
            'email': user.email
        }, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@csrf_exempt
@permission_classes([AllowAny])
def user_login(request):
    """User login endpoint"""
    serializer = UserLoginSerializer(data=request.data)
    
    if serializer.is_valid():
        user = serializer.validated_data['user']
        login(request, user)
        
        # Get user profile if exists
        try:
            profile = Profile.objects.get(user=user)
            profile_data = {
                'date_of_birth': profile.date_of_birth,
                'gender': profile.gender,
                'bio': profile.bio,
                'location': profile.location
            }
        except Profile.DoesNotExist:
            profile_data = {}
        
        return Response({
            'message': 'Login successful',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'date_joined': user.date_joined,
                'is_active': user.is_active
            },
            'profile': profile_data
        }, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        # For now, return the first profile or create a default one
        # You may want to modify this based on your specific requirements
        profile, created = Profile.objects.get_or_create(
            user_id=1,  # Default user ID, adjust as needed
            defaults={'bio': 'Default profile'}
        )
        return profile


@api_view(['GET'])
@permission_classes([AllowAny])
def user_info(request):
    """Get user information (no authentication required)"""
    # Return information about the first user or a default user
    try:
        user = User.objects.first()
        if user:
            serializer = UserSerializer(user)
            return Response(serializer.data)
        else:
            return Response({'message': 'No users found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([AllowAny])
def users_list(request):
    """Get list of all users without authentication (only public information)"""
    users = User.objects.all()
    serializer = PublicUserSerializer(users, many=True)
    return Response({
        'users': serializer.data,
        'count': users.count()
    })


@api_view(['GET'])
@permission_classes([AllowAny])
def health_check(request):
    """Health check endpoint"""
    return Response({'status': 'healthy', 'message': 'Django API is running'})
