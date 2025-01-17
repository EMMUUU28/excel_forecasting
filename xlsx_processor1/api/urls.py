from django.urls import path
from . import views
from .views import SheetData

urlpatterns = [
    path('upload/', views.upload_xlsx, name='upload_xlsx'),
    path('api/download/', views.download_file, name='download_file'),
    path('sheet/<str:sheet_name>/', SheetData.as_view(), name='sheet-data'),
    path('sheet/', SheetData.as_view(), name='sheet-data'),
]
