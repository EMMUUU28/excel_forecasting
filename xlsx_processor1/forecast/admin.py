from django.contrib import admin

# Register your models here.
from .models import  ProductDetail, MonthlyForecast


admin.site.register(ProductDetail)
admin.site.register(MonthlyForecast)

