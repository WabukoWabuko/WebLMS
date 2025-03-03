from django.contrib import admin
from .models import User, Course, StudentCourse

admin.site.register(User)
admin.site.register(Course)
admin.site.register(StudentCourse)
