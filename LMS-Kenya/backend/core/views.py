from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User, Course, StudentCourse
from .serializers import UserSerializer, CourseSerializer, StudentCourseSerializer

class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)  # Public registration

class CourseList(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = (permissions.IsAuthenticated,)  # Teachers only later

class StudentCourseEnroll(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    
    def post(self, request):
        student = request.user
        course_id = request.data.get('course_id')
        if student.role != 'student':
            return Response({'error': 'Only students can enroll'}, status=400)
        course = Course.objects.get(id=course_id)
        enrollment, created = StudentCourse.objects.get_or_create(student=student, course=course)
        return Response({'message': 'Enrolled successfully'}, status=201)
