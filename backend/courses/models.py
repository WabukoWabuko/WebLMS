# /home/wabukowabuko/Desktop/WebLMS/backend/courses/models.py
from django.db import models
from users.models import User

class Course(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    teacher = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'teacher'})
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Lesson(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='lessons')
    title = models.CharField(max_length=100)
    content = models.TextField(blank=True)
    file = models.FileField(upload_to='lessons/', blank=True, null=True)  # For PDFs, images

    def __str__(self):
        return f"{self.title} ({self.course})"
