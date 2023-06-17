from django.shortcuts import render
from django.http import JsonResponse
import openai
from mysettings import OPENAI_API_KEY
import requests
from datetime import datetime
import time
import re
import datetime

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
                sentence = res[start_index:index].strip().replace(",","")
                sentences.append(sentence)
                start_index = index + len(keyword)
    
        last_sentence = res[start_index:].strip().replace(" ","").replace(",","")
        sentences.append(last_sentence)
        
        string=sentences[4]
        print(string)
        search_value = "오전"

        if search_value in string:
            numbers = re.sub(r'[^0-9]', '', string)
            date_str = str(numbers)
            if len(date_str)==8 or len(date_str)==9:
                date = datetime.datetime.strptime(date_str, "%Y%m%d%H")
                formatted_date = date.strftime("%Y-%m-%d %H:%M")
            else:
                date = datetime.datetime.strptime(date_str, "%Y%m%d%H%M")
                formatted_date = date.strftime("%Y-%m-%d %H:%M")
            
        else:    
            numbers = re.sub(r'[^0-9]', '', string)
            date_str = str(numbers)
            date = datetime.datetime.strptime(date_str, "%Y%m%d%H%M")
            hours_to_add=12
            afternoon_time=date+datetime.timedelta(hours=hours_to_add)
            formatted_date = afternoon_time.strftime("%Y-%m-%d %H:%M")

        data = {
            "company_name": sentences[1],
            "receipt_content": sentences[2],
            "external_address": sentences[3],
            "external_startdate": formatted_date
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