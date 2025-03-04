# /home/wabukowabuko/Desktop/WebLMS/backend/weblms/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include([
        path('', include('users.urls')),
        path('', include('courses.urls')),
        path('', include('messaging.urls')),
    ])),
]
