from django.contrib import admin
from .models import LeaderboardEntry

@admin.register(LeaderboardEntry)
class LeaderboardEntryAdmin(admin.ModelAdmin):
    list_display = ['rank_display', 'username', 'total_clicks', 'clicks_per_second', 'country', 'is_verified', 'created_at']
    list_filter = ['is_verified', 'country', 'created_at']
    search_fields = ['username', 'country']
    ordering = ['-total_clicks']
    readonly_fields = ['rank_display', 'created_at', 'updated_at']
    
    def rank_display(self, obj):
        return f"#{obj.rank}"
    rank_display.short_description = 'Rank'
