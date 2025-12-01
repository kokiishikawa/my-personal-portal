from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    """UserProfile のシリアライザー"""
    
    class Meta:
        model = UserProfile
        fields = ['google_user_id', 'picture_url', 'locale', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']


class UserSerializer(serializers.ModelSerializer):
    """User のシリアライザー"""
    profile = UserProfileSerializer(read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'profile']
        read_only_fields = ['id']


class GoogleAuthRequestSerializer(serializers.Serializer):
    """Google認証リクエストのシリアライザー"""
    id_token = serializers.CharField(
        required=True,
        help_text="GoogleのIDトークン"
    )


class GoogleAuthResponseSerializer(serializers.Serializer):
    """Google認証レスポンスのシリアライザー"""
    access = serializers.CharField(help_text="Django JWTアクセストークン")
    refresh = serializers.CharField(help_text="Django JWTリフレッシュトークン")
    user = UserSerializer(help_text="ユーザー情報")