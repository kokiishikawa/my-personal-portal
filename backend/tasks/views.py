from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    """
    タスクのCRUD API
    
    ModelViewSetが自動的に以下を作成:
    - list:    GET    "/"api/tasks/         → 一覧取得
    - create:  POST   /api/tasks/         → 新規作成
    - retrieve: GET   /api/tasks/{id}/    → 詳細取得
    - update:  PUT    /api/tasks/{id}/    → 更新
    - partial_update: PATCH /api/tasks/{id}/ → 部分更新
    - destroy: DELETE /api/tasks/{id}/    → 削除
    """
    queryset = Task.objects.all()  # 全てのタスクを取得
    serializer_class = TaskSerializer  # 使うシリアライザ