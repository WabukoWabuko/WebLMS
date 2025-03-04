# /home/wabukowabuko/Desktop/WebLMS/backend/messaging/serializers.py
from rest_framework import serializers
from .models import Message

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'recipient', 'content', 'sent_at', 'is_sent']
