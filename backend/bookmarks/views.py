from rest_framework import viewsets
from .models import Bookmark
from .serializers import BookmarkSerializer


class BookmarkViewSet(viewsets.ModelViewSet):
    """
    スケジュールのCRUD API
    
    ModelViewSetが自動的に以下を作成:
    - list:    GET    "/"api/bookmarks/         → 一覧取得
    - create:  POST   /api/bookmarks/         → 新規作成
    - retrieve: GET   /api/bookmarks/{id}/    → 詳細取得
    - update:  PUT    /api/bookmarks/{id}/    → 更新
    - partial_update: PATCH /api/bookmarks/{id}/ → 部分更新
    - destroy: DELETE /api/bookmarks/{id}/    → 削除
    """
    queryset = Bookmark.objects.all()  # 全てのタスクを取得
    serializer_class = BookmarkSerializer  # 使うシリアライザ

