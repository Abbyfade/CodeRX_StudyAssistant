# urls.py
from django.urls import path
from .views import RegisterUserView, LoginUserView, LogoutUserView, UserListView


urlpatterns = [
    path('api/users/', UserListView.as_view(), name='user_list'),
    path('api/register/', RegisterUserView.as_view(), name='api_register'),
    path('api/login/', LoginUserView.as_view(), name='api_login'),
    path('api/logout/', LogoutUserView.as_view(), name='api_logout'),
]
