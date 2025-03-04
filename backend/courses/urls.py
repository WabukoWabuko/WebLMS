# /home/wabukowabuko/Desktop/WebLMS/backend/courses/urls.py
from django.urls import path
from .views import CourseListCreateView

urlpatterns = [
    path('courses/', CourseListCreateView.as_view(), name='course-list-create'),
]
