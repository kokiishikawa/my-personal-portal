import pytest

@pytest.mark.django_db
def test_schedule_date_validation(api_client):
    """日付形式のバリデーション"""
    res = api_client.post('/api/schedules/', {
        'title': 'Test',
        'memo': '',
        'location': 'location',
        'date': 'invalid-date'  # 不正な日付
    }, format='json')
    assert res.status_code == 400