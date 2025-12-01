from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from google.oauth2 import id_token
from google.auth.transport import requests

from django.conf import settings
from django.contrib.auth.models import User
from django.utils import timezone

from .models import UserProfile
from .serializers import UserSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def google_auth(request):
    """
    Google認証エンドポイント
    
    POST /api/auth/google/
    """
    # GoogleのIDトークンを取得
    google_id_token = request.data.get('id_token')
    
    if not google_id_token:
        return Response(
            {'error': 'id_token is required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        # GoogleのIDトークンを検証
        idinfo = id_token.verify_oauth2_token(
            google_id_token,
            requests.Request(),
            settings.GOOGLE_CLIENT_ID
        )
        
        # ユーザー情報を取得
        email = idinfo.get('email')
        name = idinfo.get('name', '')
        picture = idinfo.get('picture', '')
        google_user_id = idinfo.get('sub')
        locale = idinfo.get('locale', 'ja')
        
        if not email:
            return Response(
                {'error': 'Email not found in token'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # ユーザーを作成または取得
        user, user_created = User.objects.get_or_create(
            email=email,
            defaults={
                'username': email,
                'first_name': name.split()[0] if name else '',
                'last_name': ' '.join(name.split()[1:]) if len(name.split()) > 1 else '',
            }
        )
        
        # プロフィールを作成または取得
        profile, profile_created = UserProfile.objects.get_or_create(
            user=user,
            defaults={
                'google_user_id': google_user_id,
                'picture_url': picture,
                'locale': locale,
            }
        )
        
        # プロフィール情報を更新（既存ユーザーの場合）
        if not profile_created:
            profile.picture_url = picture
            profile.locale = locale
            profile.save()
        
        # 最終ログイン日時を更新
        user.last_login = timezone.now()
        user.save()
        
        # Django JWTを発行
        refresh = RefreshToken.for_user(user)
        
        # カスタムクレームを追加（オプション）
        refresh['email'] = user.email
        
        # レスポンス
        user_serializer = UserSerializer(user)
        
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': user_serializer.data
        }, status=status.HTTP_200_OK)
        
    except ValueError as e:
        return Response(
            {'error': 'Invalid token', 'detail': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        return Response(
            {'error': 'Authentication failed', 'detail': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['POST'])
@permission_classes([AllowAny])
def token_refresh(request):
    """
    トークンリフレッシュエンドポイント
    
    POST /api/auth/refresh/
    {
        "refresh": "eyJhbGci..."
    }
    """
    from rest_framework_simplejwt.views import TokenRefreshView
    view = TokenRefreshView.as_view()
    return view(request._request)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    """
    現在のユーザー情報を取得
    
    GET /api/auth/me/
    """
    serializer = UserSerializer(request.user)
    return Response(serializer.data)