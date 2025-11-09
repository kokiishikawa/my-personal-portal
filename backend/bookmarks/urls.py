from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookmarkViewSet

router = DefaultRouter()
router.register(r'', BookmarkViewSet, basename='bookmark')

# 生成されるURL:
# GET    /bookmarks/       → 一覧
# POST   /bookmarks/       → 作成
# GET    /bookmarks/{id}/  → 詳細
# PUT    /bookmarks/{id}/  → 更新
# PATCH  /bookmarks/{id}/  → 部分更新
# DELETE /bookmarks/{id}/  → 削除

urlpatterns = [
    path('', include(router.urls)),
]