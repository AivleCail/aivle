from django.shortcuts import render
from django.http import JsonResponse, HttpResponse, HttpResponseBadRequest
import openai
from mysettings import OPENAI_API_KEY
import os
import keras
from mecab import MeCab
from nltk.corpus import stopwords
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import pickle
import requests

openai.api_key = OPENAI_API_KEY

# Create your views here.
def index(request):
    return render(request, 'index.html')

def result(request):
    if request.method == "POST" and request.FILES.get("file"):
        voc_id = int(request.POST.get("voc_id"))
        file = request.FILES["file"]
        result = openai.Audio.transcribe("whisper-1", file)

        stopwords = ['의','가','이','은','들','는','좀','잘','걍','과','도','를','으로','자','에','와','한','하다','하','게','되','어서','때문','니까','어야','랑','야']
        max_len = 25
        model_file = 'best.h5'
        model_path = os.path.join(os.path.dirname(__file__), model_file)
        model = load_model(model_path)
        mecab = MeCab()
        base_dir = os.path.dirname(os.path.abspath(__file__))
        tokenizer_file = os.path.join(base_dir, 'tokenizer.pkl')
        with open(tokenizer_file, 'rb') as f:
            tokenizer = pickle.load(f, encoding='latin1')

        new_token = [word for word in mecab.morphs(result['text']) if not word in stopwords]
        new_sequences = tokenizer.texts_to_sequences([new_token])
        new_pad = pad_sequences(new_sequences, maxlen = max_len)
        score = float(model.predict(new_pad))
        
        keyword = "추가사항"
        res=result['text']
        index = res.find(keyword)

        if index != -1:
            after_sentence = res[index:].replace(keyword,"").strip()
        else:
            after_sentence = ""

        data = {
            "voc_id": voc_id,
            "voc_status": "O" if score > 0.5 else "X",
            "voc_status_detail": after_sentence
        }
        
        rest_api(data)
        
        return JsonResponse(data, safe=False, json_dumps_params={'ensure_ascii': False})
    
    else: 
        return JsonResponse({
            "result": "업로드 실패"
        })
    
def rest_api(data):
    url = 'http://localhost:8080/voc/result'
    headers = {'Content-Type': 'application/json'}
    
    requests.post(url, json=data, headers=headers)
    
    # if response.status_code == 200:
    #     print('데이터 전송 성공')
    # else:
    #     print('데이터 전송 실패')

    return None


def api(request):
    if request.method == "POST" and request.FILES.get("file"):
        response = request.FILES["file"]
        print(response)

        return HttpResponse("File received successfully.")
    else:
        return HttpResponseBadRequest("Bad Request")