from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .serializers import PDFUploadSerializer
from django.core.files.storage import default_storage
from .pdf_extractor import extract_text_from_file 
from rest_framework.permissions import AllowAny
from django.shortcuts import redirect

# Create your views here.


class PDFUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    def post(self, request, format=None):
        serializer = PDFUploadSerializer(data=request.data)
        if serializer.is_valid():
            # Save the uploaded file
            pdf_file = serializer.validated_data['file']
            file_path = default_storage.save(pdf_file.name, pdf_file)
            
            # Extract text from the uploaded PDF
            extracted_text = extract_text_from_file(file_path)
            
            # Remove the saved file after processing
            default_storage.delete(file_path)
            
            # Return the extracted text as the response
            return Response({'extracted_text': extracted_text}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)