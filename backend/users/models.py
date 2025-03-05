# /home/wabukowabuko/Desktop/WebLMS/backend/users/models.py
import random
import string
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver

class User(AbstractUser):
    # Role choices for users
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('teacher', 'Teacher'),
        ('student', 'Student'),
        ('parent', 'Parent'),
    )
    
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='student')
    phone_number = models.CharField(max_length=15, blank=True, null=True)  # For SMS
    email = models.EmailField(unique=True)  # Required for email notifications
    user_code = models.CharField(max_length=10, unique=True, editable=False)  # Unique code (e.g., T-1234)

    # Link parents to students (optional, nullable for other roles)
    student = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, 
                               limit_choices_to={'role': 'student'}, related_name='parents')

    # Add related_name to avoid clashes with auth.User
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='users_user_groups',
        blank=True,
        help_text='The groups this user belongs to.',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='users_user_permissions',
        blank=True,
        help_text='Specific permissions for this user.',
    )

    def __str__(self):
        return f"{self.username} ({self.role}) - {self.user_code}"

@receiver(post_save, sender=User)
def generate_user_code(sender, instance, created, **kwargs):
    if created and not instance.user_code:
        role_prefix = {
            'admin': 'A',
            'teacher': 'T',
            'student': 'S',
            'parent': 'P',
        }[instance.role]
        while True:
            # Generate a random 4-digit number
            random_digits = ''.join(random.choices(string.digits, k=4))
            user_code = f"{role_prefix}-{random_digits}"
            # Check if the code is unique
            if not User.objects.filter(user_code=user_code).exists():
                instance.user_code = user_code
                instance.save()
                break
