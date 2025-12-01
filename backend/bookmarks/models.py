from django.db import models
from django.contrib.auth.models import User

class Bookmark(models.Model):
    """ブックマークモデル"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookmark', verbose_name='ユーザー')
    name = models.CharField(max_length=255, verbose_name='名前')
    url = models.URLField(max_length=500, verbose_name='URL')
    iconEmoji = models.CharField(max_length=255, verbose_name='アイコン絵文字')
    color = models.CharField(max_length=255, verbose_name='色')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='作成日時')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='更新日時')

    class Meta:
        db_table = 'bookmarks'
        ordering = ['-created_at']
        verbose_name = 'ブックマーク'
        verbose_name_plural = 'ブックマーク'
        indexes = [
            models.Index(fields=['user', '-created_at']),
        ]

    def __str__(self):
        return f'{self.user.email} - {self.name}'