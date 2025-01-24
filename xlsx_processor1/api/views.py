import os
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from .pricingUtils import add_data_to_sheet,adjust_images_with_xlwings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json 
from rest_framework.parsers import MultiPartParser, FormParser
from django.http import FileResponse


current_directory = os.getcwd()

# @csrf_exempt
# def upload_xlsx(request):
#     try:
#         if request.method == 'POST' and 'file' in request.FILES:
#             uploaded_file = request.FILES['file']
#             output_filename = request.POST['output_filename']

#             # Ensure the directory exists within MEDIA_ROOT
#             processed_dir = os.path.join(settings.MEDIA_ROOT, 'processed_files')
#             os.makedirs(processed_dir, exist_ok=True)
#             file_path = os.path.join(processed_dir, f'{output_filename}.xlsx')
#             #preprocess(uploaded_file,file_path)
#             INPUT_EXCEL_FILE = uploaded_file
#             OUTPUT_EXCEL_FILE = file_path
            
#             try:
#                 add_data_to_sheet(INPUT_EXCEL_FILE, OUTPUT_EXCEL_FILE)  # Ensure this function is defined elsewhere
#                 adjust_images_with_xlwings(OUTPUT_EXCEL_FILE, OUTPUT_EXCEL_FILE)
#             except Exception as e:
#                 print(f"An error occurred during execution: {e}")

        
#             return JsonResponse({'file_path': f'{settings.MEDIA_URL}processed_files/{output_filename}.xlsx'}, status=200)


#         return JsonResponse({'error': 'No file uploaded'}, status=400)
#     except Exception as e:
#         return JsonResponse({'error': f'Server error: {str(e)}'}, status=500)


# @csrf_exempt
# def download_file(request):
#     file_path = request.GET.get('file_path')

#     if os.path.exists(file_path):
#         with open(file_path, 'rb') as fh:
#             response = HttpResponse(fh.read(), content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
#             response['Content-Disposition'] = f'attachment; filename="{os.path.basename(file_path)}"'
#             return response
#     return JsonResponse({'error': 'File not found'}, status=404)


class UploadXlsxAPIView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        try:
            uploaded_file = request.FILES.get('file')
            output_filename = request.data.get('output_filename')

            if not uploaded_file or not output_filename:
                return Response({'error': 'File or output filename not provided'}, status=status.HTTP_400_BAD_REQUEST)

            # Ensure the directory exists within MEDIA_ROOT
            processed_dir = os.path.join(settings.MEDIA_ROOT, 'processed_files')
            os.makedirs(processed_dir, exist_ok=True)
            file_path = os.path.join(processed_dir, f'{output_filename}.xlsx')

            try:
                # Process the uploaded file
                add_data_to_sheet(uploaded_file, file_path)  # Ensure this function is defined elsewhere
                adjust_images_with_xlwings(file_path, file_path)
            except Exception as e:
                return Response({'error': f'An error occurred during processing: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            file_url = f'{settings.MEDIA_URL}processed_files/{output_filename}.xlsx'
            return Response({'file_path': file_url}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': f'Server error: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DownloadFileAPIView(APIView):
    def get(self, request):
        file_path = request.query_params.get('file_path')

        if not file_path:
            return Response({'error': 'File path not provided'}, status=status.HTTP_400_BAD_REQUEST)

        full_file_path = os.path.join(settings.MEDIA_ROOT, file_path.replace(settings.MEDIA_URL, ''))

        if os.path.exists(full_file_path):
            return FileResponse(open(full_file_path, 'rb'), content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                as_attachment=True, filename=os.path.basename(full_file_path))

        return Response({'error': 'File not found'}, status=status.HTTP_404_NOT_FOUND)
    

class SheetData(APIView):

    #Self defined Function
    def get_data_from_json(self):
        file_path = os.path.join(settings.BASE_DIR,'media','output.json')
        print(file_path)

        try:
            with open(file_path, 'r') as json_file:
                data = json.load(json_file)
            return data
        except FileNotFoundError:
            return None
        except json.JSONDecodeError:
            return None
    
    #api method 
    def get(self, request, sheet_name=None):
        # If sheet_name is not provided, return the entire dataset
        data = self.get_data_from_json()

        if not data: 
            return Response(
                {"Error":"Data not found "},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        if sheet_name is None:
            return Response(data,status=status.HTTP_200_OK)
        

        sheet_data = data.get(sheet_name)
        
        if not sheet_data:
            return Response(
                {"Error":"Sheet Data not found.."},
                status = status.HTTP_404_NOT_FOUND
            )

        return Response(sheet_data, status=status.HTTP_200_OK)

