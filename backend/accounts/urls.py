from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('profile/', views.profile, name='profile'),
    path('check-username/', views.check_username, name='check-username'),
    path('check-email/', views.check_email, name='check-email'),
]
