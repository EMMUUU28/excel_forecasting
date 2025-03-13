from django.urls import path,include
from .views import UploadXlsxAPIView,DownloadFileAPIView

from rest_framework.routers import DefaultRouter
from .views import ProductDetailViewSet

router = DefaultRouter()
router.register(r'api/product', ProductDetailViewSet, basename='product-detail-forecast')

urlpatterns = [
    path('', include(router.urls)),
    path('upload/', UploadXlsxAPIView.as_view(), name='upload_xlsx'),
    path('api/download/', DownloadFileAPIView.as_view(), name='download_file'),
    
]
