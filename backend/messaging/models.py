# /home/wabukowabuko/Desktop/WebLMS/backend/messaging/models.py
from django.db import models

class Message(models.Model):
    recipient = models.CharField(max_length=100)  # Email or phone
    content = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)
    is_sent = models.BooleanField(default=False)

    def __str__(self):
        return f"Message to {self.recipient}"
