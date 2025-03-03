from rest_framework import serializers
from .models import Subject, Lesson, Enrollment

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['id', 'title', 'content', 'created_at']

class SubjectSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)
    teacher = serializers.StringRelatedField()  # Show username instead of ID

    class Meta:
        model = Subject
        fields = ['id', 'name', 'form', 'teacher', 'description', 'lessons']

class EnrollmentSerializer(serializers.ModelSerializer):
    student = serializers.StringRelatedField()
    subject = serializers.StringRelatedField()

    class Meta:
        model = Enrollment
        fields = ['id', 'student', 'subject', 'enrolled_at']
