from django.db import models
from django.contrib.auth.models import User

class Task(models.Model):
    """タスクモデル"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks', verbose_name='ユーザー')
    title = models.CharField(max_length=255, verbose_name='タイトル')
    detail = models.TextField(blank=True, null=True, verbose_name='詳細')
    done = models.BooleanField(default=False, verbose_name='完了状態')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='作成日時')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='更新日時')

    class Meta:
        db_table = 'tasks'
        ordering = ['-created_at']
        verbose_name = 'タスク'
        verbose_name_plural = 'タスク'
        indexes = [
            models.Index(fields=['user', '-created_at'])
        ]

    def __str__(self):
        return f'{self.user.email} - {self.title}'
