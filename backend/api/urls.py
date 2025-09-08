from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.UserRegistrationView.as_view(), name='user-register'),
    path('profile/', views.UserProfileView.as_view(), name='user-profile'),
    path('user/', views.user_info, name='user-info'),
    path('health/', views.health_check, name='health-check'),
]
