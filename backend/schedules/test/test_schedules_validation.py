import pytest

@pytest.mark.django_db
def test_schedule_date_validation(authenticated_client):
    """日付形式のバリデーション"""
    api_client = authenticated_client
    res = api_client.post('/api/schedules/', {
        'title': 'Test',
        'memo': '',
        'location': 'location',
        'date': 'invalid-date'  # 不正な日付
    }, format='json')
    assert res.status_code == 400