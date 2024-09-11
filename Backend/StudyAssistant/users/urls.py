# urls.py
from rest_framework.authtoken.views import obtain_auth_token
from django.urls import path
from .views import RegisterUserView, LoginUserView, LogoutUserView, UserDetailView, UserListView


urlpatterns = [
    path('api/user_detail/', UserDetailView.as_view(), name='user_detail'),
    path('api/users/', UserListView.as_view(), name='users'),
    path('api/register/', RegisterUserView.as_view(), name='api_register'),
    path('api/login/', LoginUserView.as_view(), name='api_login'),
    path('api-token-auth/', obtain_auth_token),
    path('api/logout/', LogoutUserView.as_view(), name='api_logout'),
]
