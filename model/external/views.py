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
import requests
from datetime import datetime
import time

openai.api_key = OPENAI_API_KEY

# Create your views here.
def ex_index(request):
    return render(request, 'inde.html')

def ex_result(request):
    if request.method == "POST" and request.FILES.get("file"):
        voc_id = request.POST.get("voc_id")
        file = request.FILES["file"]
        result = openai.Audio.transcribe("whisper-1", file)

        # stopwords = ['의','가','이','은','들','는','좀','잘','걍','과','도','를','으로','자','에','와','한','하다','하','게','되','어서','때문','니까','어야','랑','야']
        # max_len = 25
        # model_file = 'best.h5'
        # model_path = os.path.join(os.path.dirname(__file__), model_file)
        # model = load_model(model_path)
        # mecab = MeCab()
        # base_dir = os.path.dirname(os.path.abspath(__file__))
        # tokenizer_file = os.path.join(base_dir, 'tokenizer.pkl')
        # with open(tokenizer_file, 'rb') as f:
        #     tokenizer = pickle.load(f, encoding='latin1')

        # new_token = [word for word in mecab.morphs(result['text']) if not word in stopwords]
        # new_sequences = tokenizer.texts_to_sequences([new_token])
        # new_pad = pad_sequences(new_sequences, maxlen = max_len)
        # score = float(model.predict(new_pad))
        # def remove_spaces(sentence, target_words):
        #     for word in target_words:
        #         sentence = sentence.replace(word + ' ', word)
        #         sentence = sentence.replace(' ' + word, word)
        #     return sentence
        # target_words = ["회사 이름","공사 내용","공사 주소","공사 날짜"]

        # result = remove_spaces(result["text"], target_words)
        
        keywords = ["회사이름","공사내용","공사주소","공사날짜","회사 이름","공사 내용","공사 주소","공사 날짜"]  # Example list of keywords
        res = result["text"]
        sentences = []
        start_index = 0
        

        for keyword in keywords:
            index = res.find(keyword, start_index)
            if index != -1:
                sentence = res[start_index:index].strip()
                sentences.append(sentence)
                start_index = index + len(keyword)
                
            
    
        last_sentence = res[start_index:].strip()
        sentences.append(last_sentence)
        print(sentences)
        
        # datetime_string=sentence[4]
        # datetime_format = "%Y년 %m월 %d일"

        # datetime_result = datetime.strptime(datetime_string, datetime_format)
        # date_string = sentence[4]
        # date_format = "%Y년 %m월 %d일 %H시"

        # date_obj = datetime.strptime(date_string, date_format)
        
        # try:
        #     date_obj = datetime.strptime(date_string, date_format)
        #     print("파싱된 날짜 및 시간:", date_obj)
        # except ValueError:
        #     print("입력된 날짜 형식이 올바르지 않습니다.")


        

        data = {
            "company_name": sentences[1],
            "receipt_content": sentences[2],
            "external_address": sentences[3],
            "external_startdate": sentences[4]
            # "voc_status": "O" if score > 0.5 else "X",
            # "voc_status_detail": after_sentence
        }
        
        # rest_api(data)
        
        return JsonResponse(data, safe=False, json_dumps_params={'ensure_ascii': False})
    
    else: 
        return JsonResponse({
            "result": "업로드 실패"
        })
    
# def rest_api(data):
#     url = 'http://localhost:8080/external/result'
#     headers = {'Content-Type': 'application/json'}
    
#     requests.post(url, json=data, headers=headers)
    
#     # if response.status_code == 200:
#     #     print('데이터 전송 성공')
#     # else:
#     #     print('데이터 전송 실패')

#     return None