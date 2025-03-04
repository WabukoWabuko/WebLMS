# /home/wabukowabuko/Desktop/WebLMS/backend/messaging/urls.py
from django.urls import path
from .views import MessageListView

urlpatterns = [
    path('messages/', MessageListView.as_view(), name='message-list'),
]
