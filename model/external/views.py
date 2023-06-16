from django.shortcuts import render
from django.http import JsonResponse
import openai
from mysettings import OPENAI_API_KEY
import requests
from datetime import datetime
import time

openai.api_key = OPENAI_API_KEY

# Create your views here.
def ex_index(request):
    return render(request, 'inde.html')

def ex_result(request):
    if request.method == "POST" and request.FILES.get("file"):
        file = request.FILES["file"]
        result = openai.Audio.transcribe("whisper-1", file)
        
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