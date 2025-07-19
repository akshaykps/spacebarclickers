from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password_confirm', 'country', 'country_code', 'flag_emoji']
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError("Passwords don't match")
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        
        # Extract custom fields before creating the user
        country = validated_data.pop('country', '')
        country_code = validated_data.pop('country_code', '')
        flag_emoji = validated_data.pop('flag_emoji', '')

        user = User.objects.create_user(**validated_data)
        
        # Set custom fields after user creation
        user.country = country
        user.country_code = country_code
        user.flag_emoji = flag_emoji
        user.save() # Save the user with the new fields
        
        return user

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        
        if email and password:
            user = authenticate(username=email, password=password)
            if not user:
                raise serializers.ValidationError('Invalid credentials')
            if not user.is_active:
                raise serializers.ValidationError('User account is disabled')
            attrs['user'] = user
        else:
            raise serializers.ValidationError('Must include email and password')
        
        return attrs

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'country', 'country_code', 'flag_emoji', 'is_verified', 'created_at']
        read_only_fields = ['id', 'email', 'is_verified', 'created_at']
