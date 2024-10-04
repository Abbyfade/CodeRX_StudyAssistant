from django.urls import path
from .views import PDFUploadView, GenerateQuestionsView, UserQuestionsListView, QuestionDetailView, QuestionAnswersView, AnswersView


urlpatterns = [
    path('api/upload_pdf/', PDFUploadView.as_view(), name='upload_pdf'),
    path('api/generate/', GenerateQuestionsView.as_view(), name='generate'),
    path('api/user_questions/', UserQuestionsListView.as_view(), name='user-questions-list'),
    path('api/question_detail/<int:file_id>/', QuestionDetailView.as_view(), name='question-detail'),
    path('api/update_answers/', QuestionAnswersView.as_view(), name='update_answers'),
    path('api/get_answers/', AnswersView.as_view(), name='get_answers'),
]
