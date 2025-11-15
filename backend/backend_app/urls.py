from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/tasks/', include('tasks.urls')),
    path('api/schedules/', include('schedules.urls')),
    path('api/bookmarks/', include('bookmarks.urls')),
]
