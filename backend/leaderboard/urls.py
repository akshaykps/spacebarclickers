from django.urls import path
from . import views

urlpatterns = [
    path('', views.leaderboard, name='leaderboard'),
    path('submit/', views.submit_score, name='submit-score'),
    path('high-score/', views.get_high_score, name='high-score'),
    path('my-score/', views.my_score, name='my-score'),
]
