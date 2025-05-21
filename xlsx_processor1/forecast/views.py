import os
import time
import json 
import zipfile 

from django.conf import settings
from django.http import FileResponse
from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status, viewsets
from rest_framework.viewsets import ViewSet
from rest_framework.decorators import action

from .models import ProductDetail, MonthlyForecast, StoreForecast, ComForecast, OmniForecast
from .serializers import ProductDetailSerializer, MonthlyForecastSerializer, StoreForecastSerializer, ComForecastSerializer, OmniForecastSerializer
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
        output_folder = request.data.get('output_filename', '').strip()
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
        
       # Fetch additional forecasts by pid
        store_forecasts = StoreForecast.objects.filter(pid=pk)
        store_serializer = StoreForecastSerializer(store_forecasts, many=True)

        com_forecasts = ComForecast.objects.filter(pid=pk)
        com_serializer = ComForecastSerializer(com_forecasts, many=True)

        omni_forecasts = OmniForecast.objects.filter(pid=pk)
        omni_serializer = OmniForecastSerializer(omni_forecasts, many=True)

        return Response({
            "product_details": product_serializer.data,
            "monthly_forecast": forecast_serializer.data,
            "store_forecast": store_serializer.data,
            "com_forecast": com_serializer.data,
            "omni_forecast": omni_serializer.data
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




class ForecastViewSet(ViewSet):

    @action(detail=False, methods=["get"])
    def filter_products(self, request):
        categories     = request.query_params.getlist("category")      # multiple allowed
        birthstones    = request.query_params.getlist("birthstone")    # multiple allowed
        red_box_item   = request.query_params.get("red_box_item")
        vdf_status     = request.query_params.get("vdf_status")
        product_type   = request.query_params.get("product_type")

        response = {}

        if not product_type or product_type == "store":
            store_qs = StoreForecast.objects.all()
            if categories:
                store_qs = store_qs.filter(category__in=categories)
            if birthstones:
                store_qs = store_qs.filter(birthstone__in=birthstones)
            if red_box_item is not None:
                flag = red_box_item.lower() == "true"
                store_qs = store_qs.filter(red_box_item=flag)
            response["store_products"] = StoreForecastSerializer(store_qs, many=True).data

        if not product_type or product_type == "com":
            com_qs = ComForecast.objects.all()
            if categories:
                com_qs = com_qs.filter(category__in=categories)
            if vdf_status is not None:
                flag = vdf_status.lower() == "true"
                com_qs = com_qs.filter(vdf_status=flag)
            response["com_products"] = ComForecastSerializer(com_qs, many=True).data

        if not product_type or product_type == "omni":
            omni_qs = OmniForecast.objects.all()
            if categories:
                omni_qs = omni_qs.filter(category__in=categories)
            if birthstones:
                omni_qs = omni_qs.filter(birthstone__in=birthstones)
            response["omni_products"] = OmniForecastSerializer(omni_qs, many=True).data

        return Response(response)




class StoreForecastViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = StoreForecast.objects.all()
    serializer_class = StoreForecastSerializer


class ComForecastViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ComForecast.objects.all()
    serializer_class = ComForecastSerializer

class OmniForecastViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = OmniForecast.objects.all()
    serializer_class = OmniForecastSerializer