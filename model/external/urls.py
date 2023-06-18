from django.urls import path
from . import views

app_name = 'external'

urlpatterns = [
    path('api', views.api, name='api')
]