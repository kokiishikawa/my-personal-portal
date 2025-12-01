from django.urls import path
from . import views

app_name = 'users'

urlpatterns = [
    # Google認証
    path('auth/google/', views.google_auth, name='google_auth'),
    
    # トークンリフレッシュ
    path('auth/refresh/', views.token_refresh, name='token_refresh'),
    
    # 現在のユーザー情報
    path('auth/me/', views.current_user, name='current_user'),
]