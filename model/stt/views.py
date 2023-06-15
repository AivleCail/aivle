from django.shortcuts import render
from django.http import JsonResponse
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

openai.api_key = OPENAI_API_KEY

# Create your views here.
def index(request):
    return render(request, 'index.html')

def result(request):
    if request.method == "POST" and request.FILES.get("file"):
        file = request.FILES["file"]
        result = openai.Audio.transcribe("whisper-1", file)

        stopwords = ['의','가','이','은','들','는','좀','잘','걍','과','도','를','으로','자','에','와','한','하다','하','게','되','어서','때문','니까','어야','랑','야']
        model_file = 'best.h5'
        max_len = 25
        
        mecab = MeCab()
        model_path = os.path.join(os.path.dirname(__file__), model_file)
        print(model_path)
        model = load_model(model_path)  
        base_dir = os.path.dirname(os.path.abspath(__file__))
        tokenizer_file = os.path.join(base_dir, 'tokenizer.pkl')
        with open(tokenizer_file, 'rb') as f:
            tokenizer = pickle.load(f, encoding='latin1')

        new_token = [word for word in mecab.morphs(result['text']) if not word in stopwords]
        new_sequences = tokenizer.texts_to_sequences([new_token])
        new_pad = pad_sequences(new_sequences, maxlen = max_len)
        score = float(model.predict(new_pad))

        if score > 0.5:
            return JsonResponse({
                "voc_status": "O",
                "text": result['text'],
            }, safe=False, json_dumps_params={'ensure_ascii': False}) # 한글 인코딩 깨짐 문제
        else :
            return JsonResponse({
                "voc_status": "X",
                "text": result['text'],
            }, safe=False, json_dumps_params={'ensure_ascii': False}) # 한글 인코딩 깨짐 문제
    else: 
        return JsonResponse({
            "result": "업로드 실패"
        })
    