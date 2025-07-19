from django.contrib import admin
from .models import Achievement

@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ['name', 'unlock_at', 'speed', 'click_multiplier', 'rarity', 'is_active', 'order']
    list_filter = ['rarity', 'is_active', 'created_at']
    search_fields = ['name', 'description']
    list_editable = ['is_active', 'order']
    ordering = ['order', 'unlock_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'description', 'icon', 'rarity', 'is_active', 'order')
        }),
        ('Game Mechanics', {
            'fields': ('unlock_at', 'speed', 'click_multiplier')
        }),
        ('Theme Colors', {
            'fields': ('theme_primary', 'theme_secondary', 'theme_accent', 'theme_background', 'theme_bg_class'),
            'classes': ('collapse',)
        }),
    )
