import pytest

@pytest.mark.django_db
def test_bookmark_not_found(authenticated_client):
    """存在しないブックマーク"""
    api_client = authenticated_client
    res = api_client.get('/api/bookmarks/99999/')
    assert res.status_code == 404

@pytest.mark.django_db
def test_multiple_bookmarks(authenticated_client):
    """複数ブックマークの作成"""
    api_client = authenticated_client
    for i in range(5):
        api_client.post('/api/bookmarks/', {
            'name': f'Bookmark {i}',
            'url': f'https://example{i}.com',
            'iconEmoji': 'icon',
            'color': '#FF0000'
        }, format='json')
    
    res = api_client.get('/api/bookmarks/')
    assert len(res.data) == 5