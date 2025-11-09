from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ScheduleViewSet

router = DefaultRouter()
router.register(r'', ScheduleViewSet, basename='schedule')

# 生成されるURL:
# GET    /schedules/       → 一覧
# POST   /schedules/       → 作成
# GET    /schedules/{id}/  → 詳細
# PUT    /schedules/{id}/  → 更新
# PATCH  /schedules/{id}/  → 部分更新
# DELETE /schedules/{id}/  → 削除

urlpatterns = [
    path('', include(router.urls)),
]