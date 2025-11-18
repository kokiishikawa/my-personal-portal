from rest_framework import serializers
from .models import Bookmark

class BookmarkSerializer(serializers.ModelSerializer):
    """BookmarkモデルをJSON形式に変換する"""

    class Meta:
        model = Bookmark

        # JSONに含めるフィールド
        fields = ['id', 'name', 'url', 'iconEmoji', 'color', 'created_at', 'updated_at']

        # 読み取り専用フィールド
        read_only_fields = ['id', 'created_at', 'updated_at']