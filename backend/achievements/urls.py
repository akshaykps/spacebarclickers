from django.urls import path
from . import views

urlpatterns = [
    path('', views.AchievementListView.as_view(), name='achievement-list'), # Changed from 'achievements/'
    path('create/', views.AchievementCreateView.as_view(), name='achievement-create'),
    path('<int:pk>/', views.AchievementDetailView.as_view(), name='achievement-detail'),
    path('stats/', views.achievement_stats, name='achievement-stats'),
]
