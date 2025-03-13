from .models import ProductDetail, MonthlyForecast
from rest_framework import serializers
# Serializer for ProductDetail
class ProductDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductDetail
        fields = '__all__'

# Serializer for MonthlyForecast
class MonthlyForecastSerializer(serializers.ModelSerializer):
    class Meta:
        model = MonthlyForecast
        fields = '__all__'