from django.db import models
from django.contrib.auth.models import User

class Schedule(models.Model):
    """スケジュールモデル"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='schedule', verbose_name='ユーザー')
    title = models.CharField(max_length=255, verbose_name='タイトル')
    memo = models.CharField(max_length=255, blank=True, null=True, verbose_name='メモ')
    location = models.CharField(max_length=255, verbose_name='場所')
    date = models.DateTimeField(verbose_name='時間')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='作成日')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='更新日')

    class Meta:
        db_table = 'schedules'
        ordering = ['-created_at']
        verbose_name = 'スケジュール'
        verbose_name_plural = 'スケジュール'
        indexes = [
            models.Index(fields=['user', '-created_at']),
        ]

    def __str__(self):
        return f'{self.user.email} - {self.name}'
