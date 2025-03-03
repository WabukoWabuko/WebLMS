from django.urls import path
from .views import SubjectListCreateView, LessonListCreateView, EnrollmentListCreateView

urlpatterns = [
    path('subjects/', SubjectListCreateView.as_view(), name='subject-list'),
    path('lessons/', LessonListCreateView.as_view(), name='lesson-list'),
    path('enrollments/', EnrollmentListCreateView.as_view(), name='enrollment-list'),
]
