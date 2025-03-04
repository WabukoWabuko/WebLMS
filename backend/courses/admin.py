# /home/wabukowabuko/Desktop/WebLMS/backend/courses/admin.py
from django.contrib import admin
from .models import Course, Lesson

admin.site.register(Course)
admin.site.register(Lesson)
