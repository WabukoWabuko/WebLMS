from django.contrib import admin
from .models import Subject, Lesson, Enrollment

admin.site.register(Subject)
admin.site.register(Lesson)
admin.site.register(Enrollment)
