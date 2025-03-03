from rest_framework import serializers
from .models import Course, StudentCourse
class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'
