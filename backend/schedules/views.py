from rest_framework import viewsets
from .models import Schedule
from .serializers import ScheduleSerializer

class ScheduleViewSet(viewsets.ModelViewSet):
    """
    スケジュールのCRUD API
    
    ModelViewSetが自動的に以下を作成:
    - list:    GET    "/"api/schedules/         → 一覧取得
    - create:  POST   /api/schedules/         → 新規作成
    - retrieve: GET   /api/schedules/{id}/    → 詳細取得
    - update:  PUT    /api/schedules/{id}/    → 更新
    - partial_update: PATCH /api/schedules/{id}/ → 部分更新
    - destroy: DELETE /api/schedules/{id}/    → 削除
    """
    queryset = Schedule.objects.all()  # 全てのタスクを取得
    serializer_class = ScheduleSerializer  # 使うシリアライザ