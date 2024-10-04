from rest_framework import serializers
from .models import UploadedFile


class PDFUploadSerializer(serializers.Serializer):
    file = serializers.FileField()

class UploadedFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedFile
        fields = ['id', 'question_name', 'category', 'date_created']