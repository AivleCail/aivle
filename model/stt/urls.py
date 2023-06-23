from django.urls import path
from . import views

app_name = 'stt'

urlpatterns = [
    # path('voc_api', views.voc_api, name='voc_api'),
    path('voc_check', views.voc_check, name='voc_check'),
    # path('external_api', views.external_api, name='external_api'),
    path('external_check', views.external_check, name='voc_check'),
]