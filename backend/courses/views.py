# /home/wabukowabuko/Desktop/WebLMS/backend/courses/views.py
from rest_framework import generics
from .models import Course
from .serializers import CourseSerializer
from rest_framework.permissions import IsAuthenticated

class CourseListCreateView(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Ensure only teachers can create courses, set teacher to current user
        if self.request.user.role != 'teacher':
            raise PermissionDenied("Only teachers can create courses.")
        serializer.save(teacher=self.request.user)
