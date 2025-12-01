import pytest
from django.contrib.auth.models import User
from rest_framework.test import APIClient

@pytest.fixture
def api_client():
    """DRF用のAPIクライアント（認証なし）"""
    return APIClient()

@pytest.fixture
def test_user(db):
    """テスト用ユーザーを作成"""
    return User.objects.create_user(
        username='testuser',
        email='test@example.com',
        password='testpass123'
    )

@pytest.fixture
def authenticated_client(test_user):
    """認証済みのAPIクライアント"""
    client = APIClient()
    client.force_authenticate(user=test_user)
    return client