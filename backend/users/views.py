# /home/wabukowabuko/Desktop/WebLMS/backend/users/views.py
from rest_framework import generics, permissions
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import PermissionDenied
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from .models import User
from .serializers import UserSerializer

class RegisterView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]  # Allow anyone to register

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            if serializer.is_valid():
                # Validate password
                validate_password(request.data.get('password'), user=User)
                self.perform_create(serializer)
                headers = self.get_success_headers(serializer.data)
                return Response({
                    'message': 'User registered successfully',
                    'user': serializer.data,
                }, status=status.HTTP_201_CREATED, headers=headers)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ValidationError as e:
            return Response({'password': list(e.messages)}, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        # Set password before saving (since User model requires it)
        user = serializer.save()
        user.set_password(serializer.validated_data['password'])
        user.save()

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]  # Only admins can list users

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        user_code = request.data.get('user_code')
        password = request.data.get('password')

        if not username and not user_code:
            return Response({'error': 'Provide username or user_code'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = None
            if username:
                user = User.objects.get(username=username)
            elif user_code:
                user = User.objects.get(user_code=user_code)

            if user and user.check_password(password):
                token, created = Token.objects.get_or_create(user=user)
                return Response({
                    'token': token.key,
                    'role': user.role,
                    'user_id': user.id,
                    'user_code': user.user_code,
                })
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_401_UNAUTHORIZED)
