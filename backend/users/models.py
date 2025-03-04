# WebLMS/backend/users/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    # Role choices
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('teacher', 'Teacher'),
        ('student', 'Student'),
        ('parent', 'Parent'),
    )
    
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='student')
    phone_number = models.CharField(max_length=15, blank=True, null=True)  # For SMS
    email = models.EmailField(unique=True)  # Required for email notifications

    # Link parents to students (optional, nullable for other roles)
    student = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, 
                               limit_choices_to={'role': 'student'}, related_name='parents')

    def __str__(self):
        return f"{self.username} ({self.role})"
