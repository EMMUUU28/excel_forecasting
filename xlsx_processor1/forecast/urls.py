from django.urls import path
from . import views

urlpatterns = [
    path('upload/', views.upload_xlsx, name='upload_xlsx'),
    path('api/download/', views.download_file, name='download_file'),
    
]
