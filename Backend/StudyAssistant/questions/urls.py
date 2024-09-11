from django.urls import path
from .views import PDFUploadView, GenerateQuestionsView, UserQuestionsListView


urlpatterns = [
    path('api/upload_pdf/', PDFUploadView.as_view(), name='upload_pdf'),
    path('api/generate/', GenerateQuestionsView.as_view(), name='generate'),
    path('api/user_questions/', UserQuestionsListView.as_view(), name='user-questions-list'),
]
