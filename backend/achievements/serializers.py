from rest_framework import serializers
from .models import Achievement

class AchievementSerializer(serializers.ModelSerializer):
    theme = serializers.SerializerMethodField()
    
    class Meta:
        model = Achievement
        fields = [
            'id', 'name', 'description', 'unlock_at', 'speed', 
            'click_multiplier', 'icon', 'rarity', 'theme', 
            'is_active', 'created_at', 'updated_at', 'order'
        ]
    
    def get_theme(self, obj):
        return {
            'primary': obj.theme_primary,
            'secondary': obj.theme_secondary,
            'accent': obj.theme_accent,
            'background': obj.theme_background,
            'bgClass': obj.theme_bg_class,
        }

class AchievementCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = [
            'name', 'description', 'unlock_at', 'speed', 
            'click_multiplier', 'icon', 'rarity', 
            'theme_primary', 'theme_secondary', 'theme_accent', 
            'theme_background', 'theme_bg_class', 'is_active', 'order'
        ]
