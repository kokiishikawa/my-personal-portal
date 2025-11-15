import pytest

@pytest.mark.django_db
def test_task_crud(api_client):
    # 作成
    res = api_client.post("/api/tasks/", {
        "title": "Test",
        "detail": "Detail"
    }, format="json")
    assert res.status_code == 201
    task_id = res.data["id"]
    # 作成データの検証
    assert res.data["title"] == "Test"
    assert res.data["detail"] == "Detail"

    # 全件取得
    res = api_client.get("/api/tasks/")
    assert res.status_code == 200
    assert len(res.data) >= 1

    # 取得(特定のID)
    res = api_client.get(f"/api/tasks/{task_id}/")
    assert res.status_code == 200
    assert res.data["id"] == task_id
    assert res.data["title"] == "Test"

    # 更新
    res = api_client.put(f"/api/tasks/{task_id}/", {
        "title": "Updated",
        "detail": "Updated detail"
    }, format="json")
    assert res.status_code == 200
    assert res.data["title"] == "Updated"
    assert res.data["detail"] == "Updated detail"

    # 削除
    res = api_client.delete(f"/api/tasks/{task_id}/")
    assert res.status_code == 204
    
    # 削除確認
    res = api_client.get(f"/api/tasks/{task_id}/")
    assert res.status_code == 404