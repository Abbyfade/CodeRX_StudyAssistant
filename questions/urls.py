from django.urls import path
from .views import PDFUploadView


urlpatterns = [
    path('api/upload_pdf/', PDFUploadView.as_view(), name='upload_pdf'),
]
