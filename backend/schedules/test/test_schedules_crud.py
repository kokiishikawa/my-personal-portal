import pytest
from django.utils import timezone

@pytest.mark.django_db
def test_schedules_crud(api_client):
    # 作成
    test_date = timezone.now().isoformat()
    res = api_client.post('/api/schedules/', {
        'title': 'Test',
        'memo': '',
        'location': 'location',
        'date': test_date
    }, format='json')
    assert res.status_code == 201
    schedules_id = res.data['id']
    # 作成されたデータを検証
    assert res.data['title'] == 'Test'
    assert res.data['memo'] == ''
    assert res.data['location'] == 'location'

    # 全体表示
    res = api_client.get('/api/schedules/')
    assert res.status_code == 200
    # データが含まれているか確認
    assert len(res.data) >= 1
    
    # 取得(特定のID)
    res = api_client.get(f'/api/schedules/{schedules_id}/')
    assert res.status_code == 200
    # 正しいデータが取得できたか確認
    assert res.data['id'] == schedules_id
    assert res.data['memo'] == ''
    assert res.data['title'] == 'Test'

    # 更新
    updated_date = timezone.now().isoformat()
    res = api_client.put(f'/api/schedules/{schedules_id}/', {
        'title': 'Updated',
        'memo': 'Updated memo',
        'location': 'Updated location',
        'date': updated_date
    }, format='json')
    assert res.status_code == 200
    assert res.data["title"] == "Updated"
    # 他のフィールドも検証
    assert res.data["location"] == "Updated location"

    # 削除
    res = api_client.delete(f'/api/schedules/{schedules_id}/')
    assert res.status_code == 204
    
    # 削除後に取得できないことを確認
    res = api_client.get(f'/api/schedules/{schedules_id}/')
    assert res.status_code == 404