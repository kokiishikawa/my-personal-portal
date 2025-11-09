from django.db import models

class Bookmark(models.Model):
    """ブックマークモデル"""
    name = models.CharField(max_length=255, verbose_name='名前')
    url = models.URLField(max_length=500, verbose_name='URL')
    iconImage = models.CharField(max_length=255, verbose_name='アイコン画像')
    color = models.CharField(max_length=255, verbose_name='色')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='作成日時')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='更新日時')

    class Meta:
        db_table = 'bookmarks'
        ordering = ['-created_at']
        verbose_name = 'ブックマーク'
        verbose_name_plural = 'ブックマーク'

    def __str__(self):
        return self.name