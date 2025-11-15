import pytest

@pytest.mark.django_db
def test_bookmark_crud(api_client):
    # 作成
    res = api_client.post('/api/bookmarks/', {
        'name': 'Test',
        'url': 'https://example.com',  # 正しいURL形式
        'iconImage': 'iconImage',
        'color': '#FF0000'  # 色コード形式
    }, format='json')
    assert res.status_code == 201
    bookmark_id = res.data['id']
    # 作成データの検証
    assert res.data['name'] == 'Test'
    assert res.data['url'] == 'https://example.com'

    # 全体表示
    res = api_client.get('/api/bookmarks/')
    assert res.status_code == 200
    assert len(res.data) >= 1
    
    # 取得(特定のID)
    res = api_client.get(f'/api/bookmarks/{bookmark_id}/')
    assert res.status_code == 200
    assert res.data['id'] == bookmark_id

    # 更新
    res = api_client.put(f'/api/bookmarks/{bookmark_id}/', {
        'name': 'Updated',
        'url': 'https://updated.com',
        'iconImage': 'Updated iconImage',
        'color': '#00FF00'  # スペースを削除
    }, format='json')
    assert res.status_code == 200
    assert res.data["name"] == "Updated"
    assert res.data["url"] == "https://updated.com"

    # 削除
    res = api_client.delete(f'/api/bookmarks/{bookmark_id}/')
    assert res.status_code == 204
    
    # 削除確認
    res = api_client.get(f'/api/bookmarks/{bookmark_id}/')
    assert res.status_code == 404