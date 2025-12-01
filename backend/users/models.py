from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    """ユーザープロフィールモデル"""
    
    # Django標準Userモデルを拡張
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='profile',
        verbose_name='ユーザー',
    )

    # Google認証情報
    google_user_id = models.CharField(
        max_length=255,
        unique=True,
        db_index=True,
        verbose_name='Google User ID',
        help_text='GoogleのユーザーID(sub)。メールアドレスが変わっても不変'
    )

    picture_url = models.URLField(
        blank=True,
        verbose_name='プロフィール画像URL',
        help_text='Googleプロフィール画像のURL'
    )

    locale = models.CharField(
        max_length=10,
        blank=True,
        default='ja',
        verbose_name='言語設定',
        help_text='ユーザーの言語設定(例：ja, en)'
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='作成日時'
    )

    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name='更新日時'
    )

    class Meta:
        db_table = 'user_profiles'
        ordering = ['-created_at']
        verbose_name = 'ユーザープロフィール'
        verbose_name_plural = 'ユーザープロフィール'

    def __str__(self):
        return f'{self.user.email} のプロフィール'
    
    def get_full_name(self):
        """フルネームを取得"""
        return self.user.get_full_name() or self.user.email
    
    def get_short_name(self):
        """短い名前を取得"""
        return self.user.first_name or self.user.email.split('@')[0]



