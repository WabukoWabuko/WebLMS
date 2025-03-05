# /home/wabukowabuko/Desktop/WebLMS/backend/users/urls.py
from django.urls import path
from .views import UserListView, CustomAuthToken, RegisterView

urlpatterns = [
    path('users/', UserListView.as_view(), name='user-list'),
    path('login/', CustomAuthToken.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
]
