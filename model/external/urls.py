from django.urls import path
from . import views

app_name = 'external'

urlpatterns = [
    path('', views.ex_index, name='index'),
    path('result', views.ex_result, name='result'),
    path('api', views.api, name='api')
]