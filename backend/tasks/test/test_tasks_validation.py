import pytest

@pytest.mark.django_db
def test_task_validation(api_client):
    """必須フィールドのバリデーション"""
    # タイトルなしで作成
    res = api_client.post("/api/tasks/", {"detail": "Detail only"}, format="json")
    assert res.status_code == 400  # Bad Request
    
    # 空のタイトル
    res = api_client.post("/api/tasks/", {"title": "", "detail": "Detail"}, format="json")
    assert res.status_code == 400