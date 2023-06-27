from django.urls import path
from . import views

app_name = 'stt'

urlpatterns = [
    path('voc_check', views.voc_check, name='voc_check'),
    path('external_check', views.external_check, name='voc_check'),
]