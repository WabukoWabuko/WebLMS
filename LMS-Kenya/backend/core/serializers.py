from rest_framework import serializers
from .models import User, Course, StudentCourse

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'role', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class CourseSerializer(serializers.ModelSerializer):
    teacher = serializers.StringRelatedField()  # Shows teacher's username
    class Meta:
        model = Course
        fields = ('id', 'name', 'teacher')

class StudentCourseSerializer(serializers.ModelSerializer):
    student = serializers.StringRelatedField()
    course = serializers.StringRelatedField()
    class Meta:
        model = StudentCourse
        fields = ('id', 'student', 'course')
