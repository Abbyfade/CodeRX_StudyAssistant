from django.db import models
from django.utils import timezone
import jsonfield
from django.contrib.auth.models import User

class UploadedFile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    file_name = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    question_type = models.CharField(max_length=255)
    question_name = models.CharField(max_length=255)
    date_created = models.DateTimeField(auto_now_add=True)
    extracted_text = models.TextField()
    generated_questions = models.JSONField(null=True, blank=True)
    answers = models.JSONField(null=True, blank=True)
    score = models.CharField(max_length=255, null=True, blank=True)
    
    def __str__(self):
        return self.file_name
