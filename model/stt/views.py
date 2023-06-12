from django.shortcuts import render
from django.http import JsonResponse
import openai
from mysettings import OPENAI_API_KEY

openai.api_key = OPENAI_API_KEY

# Create your views here.
def index(request):
    return render(request, 'index.html')

def result(request):
    if request.method == "POST" and request.FILES.get("file"):
        file = request.FILES["file"]
        result = openai.Audio.transcribe("whisper-1", file)
        return JsonResponse({
            "result": result["text"]
        })
    else: 
        return JsonResponse({
            "result": "업로드 실패"
        })