from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
import api
import forecast

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('forecast/',include('forecast.urls')) , # Make sure this line is present
    path('auth/', include('authentication.urls')),


] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
