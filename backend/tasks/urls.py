from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet

# Routerが自動的にURLを生成
router = DefaultRouter()
router.register(r'', TaskViewSet, basename='task')

# 生成されるURL:
# GET    /tasks/       → 一覧
# POST   /tasks/       → 作成
# GET    /tasks/{id}/  → 詳細
# PUT    /tasks/{id}/  → 更新
# PATCH  /tasks/{id}/  → 部分更新
# DELETE /tasks/{id}/  → 削除

urlpatterns = [
    path('', include(router.urls)),
]