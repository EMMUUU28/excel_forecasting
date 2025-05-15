import os
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import time
import json 
# from .forecastUtils import make_zip_and_delete,process_data,get_previous_retail_week
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.http import FileResponse
from rest_framework import status
from .models import ProductDetail, MonthlyForecast
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from .serializers import ProductDetailSerializer, MonthlyForecastSerializer
import zipfile 
from .service.exportExcel import process_data

def make_zip_and_delete(folder_path):
    folder_path = os.path.normpath(folder_path)
    zip_file_path = os.path.normpath(f'{folder_path}.zip')
    
    try:
        # Create a ZIP file
        with zipfile.ZipFile(zip_file_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
            for root, dirs, files in os.walk(folder_path):
                for file in files:
                    file_path = os.path.join(root, file)
                    arcname = os.path.relpath(file_path, folder_path)  # Preserve folder structure
                    zipf.write(file_path, arcname)
        
        print(f"Folder '{folder_path}' has been compressed into '{zip_file_path}'")

        # # Delete the folder after zipping
        # shutil.rmtree(folder_path)
        # print(f"Folder '{folder_path}' has been deleted successfully.")
    
    except PermissionError:
        print(f"Permission denied: Cannot access '{folder_path}'. Please check folder permissions.")
    except FileNotFoundError:
        print(f"File not found: '{folder_path}' does not exist.")
    except Exception as e:
        print(f"An error occurred: {e}")
 

class UploadXlsxAPIView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        uploaded_file = request.FILES.get('file')
        output_folder = request.data.get('output_filename')
        month_from = request.data.get('month_from')
        month_to = request.data.get('month_to')
        percentage = request.data.get('percentage')
        categories = request.data.get('categories')

        if not uploaded_file or not output_folder:
            return Response({'error': 'File or output folder not provided'}, status=status.HTTP_400_BAD_REQUEST)

        input_tuple = []
        if categories:
            input_tuple = [(item['name'], item['value']) for item in json.loads(categories)]

        processed_dir = os.path.join(settings.MEDIA_ROOT, 'processed_files')
        os.makedirs(processed_dir, exist_ok=True)
        output_folder_path = os.path.join(processed_dir, output_folder)
        os.makedirs(output_folder_path, exist_ok=True)

        # Save uploaded file into MEDIA_ROOT
        save_path = os.path.join(output_folder_path, uploaded_file.name)
        with open(save_path, 'wb+') as dest:
            for chunk in uploaded_file.chunks():
                dest.write(chunk)
        input_path = save_path

        try:
            start_time = time.time()
            process_data(input_path, output_folder_path, month_from, month_to, percentage, input_tuple)
            elapsed_time = time.time() - start_time
            print(f"Processing took {elapsed_time:.3f}s")
            make_zip_and_delete(output_folder_path)
        except Exception as e:
            return Response({'error': f'Processing error: {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        zip_rel = f'processed_files/{output_folder}.zip'
        zip_url = request.build_absolute_uri(settings.MEDIA_URL + zip_rel)
        return Response({'file_url': zip_url}, status=status.HTTP_200_OK)


class DownloadFileAPIView(APIView):
    def get(self, request):
        file_path = request.query_params.get('file_path')

        if not file_path:
            return Response({'error': 'File path not provided'}, status=status.HTTP_400_BAD_REQUEST)

        full_file_path = os.path.join(settings.MEDIA_ROOT, file_path.replace(settings.MEDIA_URL, ''))

        if os.path.exists(full_file_path):
            return FileResponse(open(full_file_path, 'rb'), content_type='application/zip',
                                as_attachment=True, filename=os.path.basename(full_file_path))

        return Response({'error': 'File not found'}, status=status.HTTP_404_NOT_FOUND)


class ProductDetailViewSet(viewsets.ViewSet):
    def retrieve(self, request, pk=None):
        # Fetch product details
        product = get_object_or_404(ProductDetail, product_id=pk)
        product_serializer = ProductDetailSerializer(product)
        
        # Fetch forecasts
        forecasts = MonthlyForecast.objects.filter(product=product)
        forecast_serializer = MonthlyForecastSerializer(forecasts, many=True)
        
        return Response({
            "product_details": product_serializer.data,
            "monthly_forecast": forecast_serializer.data
        })
    
    def update(self, request, pk=None):
        # Fetch product details
        product = get_object_or_404(ProductDetail, product_id=pk)
        product_serializer = ProductDetailSerializer(product, data=request.data.get("product_details", {}), partial=True)
        
        if product_serializer.is_valid():
            product_serializer.save()
        else:
            return Response(product_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # Fetch and update forecasts
        forecast_data = request.data.get("monthly_forecast", [])
        for forecast in forecast_data:
            forecast_instance = MonthlyForecast.objects.filter(product=product, variable_name=forecast.get("variable_name"), year=forecast.get("year")).first()
            if forecast_instance:
                forecast_serializer = MonthlyForecastSerializer(forecast_instance, data=forecast, partial=True)
            else:
                forecast["product"] = product.product_id
                forecast_serializer = MonthlyForecastSerializer(data=forecast)
            
            if forecast_serializer.is_valid():
                forecast_serializer.save()
            else:
                return Response(forecast_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({
            "product_details": product_serializer.data,
            "monthly_forecast": MonthlyForecastSerializer(MonthlyForecast.objects.filter(product=product), many=True).data
        })
