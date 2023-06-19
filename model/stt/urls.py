from django.urls import path
from . import views

app_name = 'stt'

urlpatterns = [
    path('', views.index, name='index'),
    path('result', views.result, name='result'),
    path('api', views.api, name='api')
]