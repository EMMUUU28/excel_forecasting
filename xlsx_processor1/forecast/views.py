import os
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import time
import json 
from .forecastUtils import process_data
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.http import FileResponse
from rest_framework import status
import zipfile 
import shutil


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

            # Delete the folder after zipping
            shutil.rmtree(folder_path)
            print(f"Folder '{folder_path}' has been deleted successfully.")
        
        except PermissionError:
            print(f"Permission denied: Cannot access '{folder_path}'. Please check folder permissions.")
        except FileNotFoundError:
            print(f"File not found: '{folder_path}' does not exist.")
        except Exception as e:
            print(f"An error occurred: {e}")




class UploadXlsxAPIView(APIView):
    parser_classes = [MultiPartParser, FormParser]
 
    def post(self, request):
        try:
            uploaded_file = request.FILES.get('file')
            output_folder = request.data.get('output_filename')
            month_from = request.data.get('month_from')
            month_to = request.data.get('month_to')
            percentage = request.data.get('percentage')
            categories = request.data.get('categories')

            if not uploaded_file or not output_folder:
                return Response({'error': 'File or output folder not provided'}, status=status.HTTP_400_BAD_REQUEST)

            if categories:
                categories = json.loads(categories)  # Convert JSON string to list of dictionaries
                input_tuple = [(item['name'], item['value']) for item in categories]
            else:
                input_tuple = []

            # Ensure the directory exists within MEDIA_ROOT
            processed_dir = os.path.join(settings.MEDIA_ROOT, 'processed_files')
            os.makedirs(processed_dir, exist_ok=True)
            output_folder_path = os.path.join(processed_dir, output_folder)
            os.makedirs(output_folder_path, exist_ok=True)

            input_path = uploaded_file.temporary_file_path()
            file_path = output_folder_path

            try:
                start_time = time.time()
                process_data(input_path, file_path, month_from, month_to, percentage, input_tuple)  # Ensure this function is defined elsewhere
                end_time = time.time()
                elapsed_time = end_time - start_time
                print(f"Function executed in {elapsed_time:.6f} seconds")
                make_zip_and_delete(file_path)  # Ensure this function is defined elsewhere
            except Exception as e:
                return Response({'error': f'An error occurred during processing: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            file_url = f'{settings.MEDIA_URL}processed_files/{output_folder}.zip'
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
            return FileResponse(open(full_file_path, 'rb'), content_type='application/zip',
                                as_attachment=True, filename=os.path.basename(full_file_path))

        return Response({'error': 'File not found'}, status=status.HTTP_404_NOT_FOUND)
