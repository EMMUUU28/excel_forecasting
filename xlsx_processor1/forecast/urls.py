from django.urls import path
from .views import UploadXlsxAPIView,DownloadFileAPIView

urlpatterns = [
    path('upload/', UploadXlsxAPIView.as_view(), name='upload_xlsx'),
    path('api/download/', DownloadFileAPIView.as_view(), name='download_file'),
    
]
