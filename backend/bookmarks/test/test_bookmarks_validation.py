import pytest

@pytest.mark.django_db
def test_bookmark_url_validation(authenticated_client):
    """URL形式のバリデーション"""
    api_client = authenticated_client
    res = api_client.post('/api/bookmarks/', {
        'name': 'Test',
        'url': 'invalid-url',  # 不正なURL
        'iconEmoji': 'icon',
        'color': 'red'
    }, format='json')
    assert res.status_code == 400