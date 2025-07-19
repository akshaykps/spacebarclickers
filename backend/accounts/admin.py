from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ['username', 'email', 'country', 'is_verified', 'is_active', 'created_at']
    list_filter = ['is_verified', 'is_active', 'country', 'created_at']
    search_fields = ['username', 'email', 'country']
    ordering = ['-created_at']
    
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Additional Info', {
            'fields': ('country', 'country_code', 'flag_emoji', 'is_verified')
        }),
    )
