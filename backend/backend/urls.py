from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),
    # Cette ligne expose la route '/api-token-auth/' que le frontend va utiliser
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
]