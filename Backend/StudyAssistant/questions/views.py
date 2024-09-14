from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .serializers import PDFUploadSerializer, UploadedFileSerializer
from django.core.files.storage import default_storage
from .pdf_extractor import extract_text_from_file 
from rest_framework.permissions import AllowAny
from django.shortcuts import redirect
from .models import UploadedFile
from django.utils import timezone
from .quest_gen import generate_exam_questions

# Create your views here.

class PDFUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated] 

    def post(self, request, format=None):
        serializer = PDFUploadSerializer(data=request.data)
        if serializer.is_valid():
            # Save the uploaded file
            file = serializer.validated_data['file']
            file_path = default_storage.save(file.name, file)
            file_name = file.name

            # Extract text from the uploaded PDF
            extracted_text = extract_text_from_file(file_path)
            
            # Remove the saved file after processing
            default_storage.delete(file_path)

            # Save the file details and extracted text in the model
            uploaded_file = UploadedFile.objects.create(
                user=request.user,
                file_name=file_name,
                category='',
                date_created=timezone.now(),
                extracted_text=extracted_text,
                generated_questions={}
            )
            file_id = uploaded_file.id
            
            # Return the extracted text as the response
            return Response({'file_name': file_name, 'file_id': file_id, 'extracted_text': extracted_text}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GenerateQuestionsView(APIView):
    permission_classes = [IsAuthenticated] 

    def post(self, request, format=None):
        file_id = request.data.get('file_id')
        question_name = request.data.get('question_name')
        input_text = request.data.get('extracted_text')
        domain = request.data.get('category')
        try:
            uploaded_file = UploadedFile.objects.get(id=file_id, user=request.user)
            
            # Implement your question generation logic here.
            # For now, we’ll use a placeholder example.
            generated_questions = generate_exam_questions(input_text, domain)
            
            # Update the model with generated questions
            uploaded_file.question_name = question_name
            uploaded_file.generated_questions = generated_questions
            uploaded_file.category = domain
            uploaded_file.save()
            
            return Response({"message": "Questions generated successfully", "generated_questions": generated_questions}, status=status.HTTP_200_OK)
        
        except UploadedFile.DoesNotExist:
            return Response({"error": "File not found"}, status=status.HTTP_404_NOT_FOUND)

class UserQuestionsListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Fetching queryset manually
        questions = UploadedFile.objects.filter(user=self.request.user).order_by('-date_created')
        # Serializing data
        serializer = UploadedFileSerializer(questions, many=True)
        # Custom response
        return Response({'questions': serializer.data})

class QuestionDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, file_id):
        question = UploadedFile.objects.get(id=file_id)
        question_name= question.question_name
        question_detail = question.generated_questions
        return Response({'question_name': question_name, 'question_detail': question_detail})