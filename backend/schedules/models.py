from django.db import models

class Schedule(models.Model):
    """スケジュールモデル"""
    title = models.CharField(max_length=255, verbose_name='タイトル')
    location = models.CharField(max_length=255, verbose_name='場所')
    date = models.DateTimeField(verbose_name='時間')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='作成日')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='更新日')

    class Meta:
        db_table = 'schedules'
        ordering = ['-created_at']
        verbose_name = 'スケジュール'
        verbose_name_plural = 'スケジュール'

    def __str__(self):
        return self.title
