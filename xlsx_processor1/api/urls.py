from django.urls import path
from . import views
from .views import SheetData,UploadXlsxAPIView,DownloadFileAPIView

urlpatterns = [
    path('upload/', UploadXlsxAPIView.as_view(), name='upload_xlsx'),
    path('api/download/', DownloadFileAPIView.as_view(), name='download_file'),
    path('sheet/<str:sheet_name>/', SheetData.as_view(), name='sheet-data'),
    path('sheet/', SheetData.as_view(), name='sheet-data'),
]
