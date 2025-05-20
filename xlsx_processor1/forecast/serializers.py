from .models import ProductDetail, MonthlyForecast, StoreForecast, ComForecast, OmniForecast
from rest_framework import serializers
import math
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

class FloatHandlingSerializerMixin:
    """Mixin to handle infinite float values in serialization"""
    
    def to_representation(self, instance):
        """Override to_representation to handle infinite values"""
        ret = super().to_representation(instance)
        
        # Iterate through all fields
        for field_name, field_value in ret.items():
            # Check if it's a float and if it's infinite
            if isinstance(field_value, float) and (math.isinf(field_value) or math.isnan(field_value)):
                if math.isinf(field_value):
                    # Replace infinity with a very large number or null
                    if field_value > 0:
                        ret[field_name] = None  # or use a large number like 1e308
                    else:
                        ret[field_name] = None  # or use a large negative number like -1e308
                else:  # isnan
                    ret[field_name] = None
        
        return ret

class StoreForecastSerializer(FloatHandlingSerializerMixin, serializers.ModelSerializer):
    class Meta:
        model = StoreForecast
        fields = '__all__'

class ComForecastSerializer(FloatHandlingSerializerMixin, serializers.ModelSerializer):
    class Meta:
        model = ComForecast
        fields = '__all__'

class OmniForecastSerializer(FloatHandlingSerializerMixin, serializers.ModelSerializer):
    class Meta:
        model = OmniForecast
        fields = '__all__'