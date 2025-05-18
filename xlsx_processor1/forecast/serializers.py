from .models import ProductDetail, MonthlyForecast, StoreForecast, ComForecast, OmniForecast
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

class StoreForecastSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoreForecast
        fields = '__all__'

class ComForecastSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComForecast
        fields = '__all__'

class OmniForecastSerializer(serializers.ModelSerializer):
    class Meta:
        model = OmniForecast
        fields = '__all__'