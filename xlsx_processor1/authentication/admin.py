from django.contrib import admin

# Register your models here.
from .models import CustomUser, Role

admin.site.register(Role)
admin.site.register(CustomUser)