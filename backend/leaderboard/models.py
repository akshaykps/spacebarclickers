from django.db import models
from django.conf import settings

class LeaderboardEntry(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    username = models.CharField(max_length=100)
    total_clicks = models.BigIntegerField(default=0)
    clicks_per_second = models.IntegerField(default=0)
    achievements_unlocked = models.IntegerField(default=0)
    achievements_activated = models.IntegerField(default=0)
    time_played_seconds = models.IntegerField(default=0)
    country = models.CharField(max_length=100, blank=True)
    country_code = models.CharField(max_length=2, blank=True)
    flag_emoji = models.CharField(max_length=10, blank=True)
    is_verified = models.BooleanField(default=False)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-total_clicks', '-clicks_per_second']
        unique_together = ['user', 'username']
    
    def __str__(self):
        return f"{self.username} - {self.total_clicks:,} clicks"
    
    @property
    def rank(self):
        return LeaderboardEntry.objects.filter(total_clicks__gt=self.total_clicks).count() + 1
    
    def save(self, *args, **kwargs):
        if self.user:
            self.is_verified = self.user.is_verified
            self.country = self.user.country
            self.country_code = self.user.country_code
            self.flag_emoji = self.user.flag_emoji
        super().save(*args, **kwargs)
