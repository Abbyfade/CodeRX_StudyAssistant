# urls.py
from django.urls import path
from .views import RegisterUserView, LoginUserView, LogoutUserView, UserDetailView


urlpatterns = [
    path('api/user_detail/', UserDetailView.as_view(), name='user_detail'),
    path('api/register/', RegisterUserView.as_view(), name='api_register'),
    path('api/login/', LoginUserView.as_view(), name='api_login'),
    path('api/logout/', LogoutUserView.as_view(), name='api_logout'),
]
