from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
from .models import Achievement
from .serializers import AchievementSerializer, AchievementCreateSerializer

class AchievementListView(generics.ListAPIView):
    """Get all active achievements"""
    serializer_class = AchievementSerializer
    
    def get_queryset(self):
        return Achievement.objects.filter(is_active=True).order_by('order', 'unlock_at')
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        # Convert to frontend format
        achievements = [achievement.to_frontend_format() for achievement in queryset]
        return Response({
            'success': True,
            'achievements': achievements,
            'count': len(achievements)
        })

class AchievementCreateView(generics.CreateAPIView):
    """Create a new achievement"""
    queryset = Achievement.objects.all()
    serializer_class = AchievementCreateSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            achievement = serializer.save()
            return Response({
                'success': True,
                'message': 'Achievement created successfully',
                'achievement': achievement.to_frontend_format()
            }, status=status.HTTP_201_CREATED)
        return Response({
            'success': False,
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

class AchievementDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Get, update, or delete a specific achievement"""
    queryset = Achievement.objects.all()
    serializer_class = AchievementSerializer
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        return Response({
            'success': True,
            'achievement': instance.to_frontend_format()
        })
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = AchievementCreateSerializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            achievement = serializer.save()
            return Response({
                'success': True,
                'message': 'Achievement updated successfully',
                'achievement': achievement.to_frontend_format()
            })
        return Response({
            'success': False,
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({
            'success': True,
            'message': 'Achievement deleted successfully'
        }, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def achievement_stats(request):
    """Get achievement statistics"""
    total_achievements = Achievement.objects.filter(is_active=True).count()
    achievements_by_rarity = {}
    
    for rarity, _ in Achievement.RARITY_CHOICES:
        count = Achievement.objects.filter(is_active=True, rarity=rarity).count()
        achievements_by_rarity[rarity] = count
    
    return JsonResponse({
        'success': True,
        'stats': {
            'total_achievements': total_achievements,
            'by_rarity': achievements_by_rarity,
        }
    })
