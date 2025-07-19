from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.db.models import Q
from .models import LeaderboardEntry
from .serializers import LeaderboardEntrySerializer, LeaderboardSubmissionSerializer

def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

@api_view(['GET'])
@permission_classes([AllowAny])
def leaderboard(request):
    entries = LeaderboardEntry.objects.all()[:50]  # Top 50
    serializer = LeaderboardEntrySerializer(entries, many=True)
    return Response({
        'success': True,
        'leaderboard': serializer.data,
        'count': entries.count()
    })

@api_view(['POST'])
@permission_classes([AllowAny])
def submit_score(request):
    serializer = LeaderboardSubmissionSerializer(data=request.data)
    if not serializer.is_valid():
        return Response({
            'success': False,
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
    data = serializer.validated_data
    ip_address = get_client_ip(request)
    
    # Check if user is authenticated
    user = request.user if request.user.is_authenticated else None
    
    # Find existing entry
    if user:
        entry, created = LeaderboardEntry.objects.get_or_create(
            user=user,
            defaults={
                'username': data['username'],
                'total_clicks': data['total_clicks'],
                'clicks_per_second': data['clicks_per_second'],
                'achievements_unlocked': data['achievements_unlocked'],
                'achievements_activated': data['achievements_activated'],
                'time_played_seconds': data['time_played_seconds'],
                'country': data.get('country', ''),
                'country_code': data.get('country_code', ''),
                'flag_emoji': data.get('flag_emoji', ''),
                'ip_address': ip_address,
            }
        )
    else:
        # For anonymous users, check by username and IP
        entry, created = LeaderboardEntry.objects.get_or_create(
            username=data['username'],
            user__isnull=True,
            defaults={
                'total_clicks': data['total_clicks'],
                'clicks_per_second': data['clicks_per_second'],
                'achievements_unlocked': data['achievements_unlocked'],
                'achievements_activated': data['achievements_activated'],
                'time_played_seconds': data['time_played_seconds'],
                'country': data.get('country', ''),
                'country_code': data.get('country_code', ''),
                'flag_emoji': data.get('flag_emoji', ''),
                'ip_address': ip_address,
            }
        )
    
    # Update if score is higher
    score_improved = False
    if not created and data['total_clicks'] > entry.total_clicks:
        entry.total_clicks = data['total_clicks']
        entry.clicks_per_second = data['clicks_per_second']
        entry.achievements_unlocked = data['achievements_unlocked']
        entry.achievements_activated = data['achievements_activated']
        entry.time_played_seconds = data['time_played_seconds']
        entry.save()
        score_improved = True
    
    # Check if this is a new high score
    higher_scores = LeaderboardEntry.objects.filter(total_clicks__gt=entry.total_clicks).count()
    is_new_record = higher_scores == 0
    rank = higher_scores + 1
    
    return Response({
        'success': True,
        'message': 'Score submitted successfully',
        'entry': LeaderboardEntrySerializer(entry).data,
        'is_new_record': is_new_record,
        'score_improved': score_improved or created,
        'rank': rank,
        'created': created
    })

@api_view(['GET'])
@permission_classes([AllowAny])
def get_high_score(request):
    try:
        highest_entry = LeaderboardEntry.objects.first()
        if highest_entry:
            return Response({
                'success': True,
                'high_score': highest_entry.total_clicks,
                'holder': highest_entry.username,
                'country': highest_entry.country,
                'flag_emoji': highest_entry.flag_emoji,
                'is_verified': highest_entry.is_verified
            })
        else:
            return Response({
                'success': True,
                'high_score': 0,
                'holder': None
            })
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_score(request):
    try:
        entry = LeaderboardEntry.objects.get(user=request.user)
        return Response({
            'success': True,
            'entry': LeaderboardEntrySerializer(entry).data
        })
    except LeaderboardEntry.DoesNotExist:
        return Response({
            'success': False,
            'message': 'No score found'
        }, status=status.HTTP_404_NOT_FOUND)
