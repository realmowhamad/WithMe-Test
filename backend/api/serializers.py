from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_joined']
        read_only_fields = ['id', 'date_joined']


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Profile
        fields = ['id', 'user', 'bio', 'location', 'date_of_birth', 'gender', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True)
    date_of_birth = serializers.DateField(required=True, write_only=True)
    gender = serializers.ChoiceField(choices=Profile.GENDER_CHOICES, required=True, write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password_confirm', 'date_of_birth', 'gender']
        read_only_fields = ['id']

    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError("Passwords don't match")
        return attrs

    def create(self, validated_data):
        # Extract profile data
        date_of_birth = validated_data.pop('date_of_birth')
        gender = validated_data.pop('gender')
        password_confirm = validated_data.pop('password_confirm')
        
        # Create user
        user = User.objects.create_user(**validated_data)
        
        # Create profile with additional fields
        Profile.objects.create(
            user=user,
            date_of_birth=date_of_birth,
            gender=gender
        )
        return user

    def to_representation(self, instance):
        # Return only the user data, not the profile fields
        return {
            'id': instance.id,
            'username': instance.username,
            'email': instance.email,
            'date_joined': instance.date_joined
        }


class PublicUserSerializer(serializers.ModelSerializer):
    """Serializer for public user information (only registration fields)"""
    date_of_birth = serializers.SerializerMethodField()
    gender = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'date_of_birth', 'gender', 'date_joined']
        read_only_fields = ['id', 'date_joined']
    
    def get_date_of_birth(self, obj):
        try:
            profile = Profile.objects.get(user=obj)
            return profile.date_of_birth
        except Profile.DoesNotExist:
            return None
    
    def get_gender(self, obj):
        try:
            profile = Profile.objects.get(user=obj)
            return profile.get_gender_display() if profile.gender else None
        except Profile.DoesNotExist:
            return None


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            from django.contrib.auth import authenticate
            user = authenticate(username=username, password=password)
            
            if not user:
                raise serializers.ValidationError('Invalid username or password.')
            
            if not user.is_active:
                raise serializers.ValidationError('User account is disabled.')
            
            attrs['user'] = user
            return attrs
        else:
            raise serializers.ValidationError('Must include username and password.')
