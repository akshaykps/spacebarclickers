from rest_framework import serializers
from .models import LeaderboardEntry

class LeaderboardEntrySerializer(serializers.ModelSerializer):
    rank = serializers.ReadOnlyField()
    
    class Meta:
        model = LeaderboardEntry
        fields = [
            'id', 'username', 'total_clicks', 'clicks_per_second', 
            'achievements_unlocked', 'achievements_activated', 
            'time_played_seconds', 'country', 'country_code', 
            'flag_emoji', 'is_verified', 'rank', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'rank', 'created_at', 'updated_at']

class LeaderboardSubmissionSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=100)
    total_clicks = serializers.IntegerField(min_value=0)
    clicks_per_second = serializers.IntegerField(min_value=0)
    achievements_unlocked = serializers.IntegerField(min_value=0)
    achievements_activated = serializers.IntegerField(min_value=0)
    time_played_seconds = serializers.IntegerField(min_value=0)
    country = serializers.CharField(max_length=100, required=False, allow_blank=True)
    country_code = serializers.CharField(max_length=2, required=False, allow_blank=True)
    flag_emoji = serializers.CharField(max_length=10, required=False, allow_blank=True)
