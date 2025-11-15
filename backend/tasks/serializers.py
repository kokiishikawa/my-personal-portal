from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    """TaskモデルをJSON形式に変換する"""

    class Meta:
        model = Task

        # JSONに含めるフィールド
        fields = ['id', 'title', 'detail', 'done', 'created_at', 'updated_at']
        
        # 読み取り専用(APIで変更できない)フィールド
        read_only_fields = ['id', 'created_at', 'updated_at']