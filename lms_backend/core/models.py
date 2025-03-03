from django.db import models
from django.contrib.auth.models import User

# Subject model (e.g., Mathematics, Kiswahili)
class Subject(models.Model):
    name = models.CharField(max_length=100)  # e.g., "Mathematics"
    form = models.IntegerField(choices=[(i, f"Form {i}") for i in range(1, 5)])  # Form 1-4
    teacher = models.ForeignKey(User, on_delete=models.CASCADE, related_name="subjects_taught")
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.name} (Form {self.form})"

# Lesson model (content within a subject)
class Lesson(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="lessons")
    title = models.CharField(max_length=200)  # e.g., "Quadratic Equations"
    content = models.TextField()  # Lesson text
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

# Enrollment model (students enrolled in subjects)
class Enrollment(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name="enrollments")
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="enrollments")
    enrolled_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('student', 'subject')  # Prevent duplicate enrollments

    def __str__(self):
        return f"{self.student.username} - {self.subject.name}"
