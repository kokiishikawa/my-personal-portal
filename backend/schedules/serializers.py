from rest_framework import serializers
from .models import Schedule

class ScheduleSerializer(serializers.ModelSerializer):
    """ScheduleモデルをJSON形式に変換する"""

    class Meta:
        model = Schedule

        # JSONに含めるフィールド
        fields = ['id', 'title', 'location', 'date', 'created_at', 'updated_at']

        # 読み取り専用フィールド
        read_only_fields = ['id', 'created_at', 'updated_at']