# /home/wabukowabuko/Desktop/WebLMS/backend/messaging/views.py
from rest_framework import generics
from .models import Message
from .serializers import MessageSerializer
from rest_framework.permissions import IsAdminUser

class MessageListView(generics.ListAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [IsAdminUser]  # Only admins can list messages
