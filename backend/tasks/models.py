from django.db import models

class Task(models.Model):
    """タスクモデル"""
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

    def __str__(self):
        return self.title
