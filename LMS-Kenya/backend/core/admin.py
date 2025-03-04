from django.contrib import admin
from .models import User, Course, StudentCourse

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'role', 'email', 'is_staff')
    list_filter = ('role',)
    search_fields = ('username', 'email')

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('name', 'teacher')
    list_filter = ('teacher',)
    search_fields = ('name',)

@admin.register(StudentCourse)
class StudentCourseAdmin(admin.ModelAdmin):
    list_display = ('student', 'course')
    list_filter = ('course',)
    search_fields = ('student__username', 'course__name')
