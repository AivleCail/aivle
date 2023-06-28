import os
import re
import datetime
import pickle
from django.http import JsonResponse, HttpResponse
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
from mecab import MeCab
import openai
from mysettings import OPENAI_API_KEY
import json


openai.api_key = OPENAI_API_KEY

# Create your views here.
def voc_check(request):
    if request.method == "POST" and request.FILES.get("file"):
        file = request.FILES["file"]
        result = openai.Audio.transcribe("whisper-1", file)

        keyword = "추가사항"
        res=result['text']
        index = res.find(keyword)

        if index != -1:
            before_sentence = res[:index].strip()
            after_sentence = res[index:].replace(keyword,"").strip()
        else:
            before_sentence = ""
            after_sentence = ""
            
        stopwords = ['도', '는', '다', '의', '가', '이', '은', '한', '에', '하', '고', '을', '를', '인', '듯', '과', '와', '네', '들', '듯', '지', '임', '게','게임']
        max_len = 100
        model_file = 'third.h5'
        model_path = os.path.join(os.path.dirname(__file__), model_file)
        model = load_model(model_path)
        mecab = MeCab()
        base_dir = os.path.dirname(os.path.abspath(__file__))
        tokenizer_file = os.path.join(base_dir, 'thirdtry.pickle')
        with open(tokenizer_file, 'rb') as f:
            tokenizer = pickle.load(f, encoding='utf-8')
            
        new_token=re.sub(r'[^ㄱ-ㅎㅏ-ㅣ가-힣 ]','', before_sentence)
        new_token = mecab.morphs(before_sentence)
        new_token = [word for word in new_token if not word in stopwords]
        new_sequences = tokenizer.texts_to_sequences([new_token])
        new_pad = pad_sequences(new_sequences, maxlen = max_len)
        score = float(model.predict(new_pad))

        print(new_token)
        print(new_sequences)

        data = {
            "voc_entire":before_sentence+after_sentence,
            "voc_status": "O" if score > 0.5 else "X",
            "voc_status_detail": after_sentence,
            "percentage":"{:.2f}%".format(score * 100) if score>0.5 else "{:.2f}%".format((1-score)*100)
        }
        response_data = json.dumps(data, ensure_ascii=False)  # 데이터를 JSON 문자열로 변환
        return HttpResponse(response_data, content_type="application/json")
    
    else: 
        return JsonResponse({
            "result": "업로드 실패"
        })
def external_check(request):
    if request.method == "POST" and request.FILES.get("file"):
        file = request.FILES["file"]
        token = request.POST.get("token")
        result = openai.Audio.transcribe("whisper-1", file)
        keywords = ["회사이름", "회사 이름", "공사내용", "공사 내용", "공사주소", "공사 주소", "공사날짜", "공사 날짜"]
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
        
        company_name = sentences[1]
        construction_content = sentences[2]
        construction_address = sentences[3]
        construction_date = sentences[4]
        
        string=construction_date
        search_value = "오전"
        search_value2 = "오후"

        if search_value in string:
            numbers = re.sub(r'[^0-9]', '', string)
            date_str = str(numbers)
            date = datetime.datetime.strptime(date_str, "%Y%m%d%H")
            formatted_date = date.strftime("%Y-%m-%d %H:%M")
            
        if search_value2 in string:    
            numbers = re.sub(r'[^0-9]', '', string)
            date_str = str(numbers)
            date = datetime.datetime.strptime(date_str, "%Y%m%d%H")
            formatted_date = date.strftime("%Y-%m-%d %H:%M")
            hours_to_add=12
            afternoon_time=date+datetime.timedelta(hours=hours_to_add)
            formatted_date = afternoon_time.strftime("%Y-%m-%d %H:%M")

        data = {
            "companyName": company_name,
            "receiptContent": construction_content,
            "externalAddress": construction_address,
            "externalStartdate": formatted_date
        }
        response_data = json.dumps(data, ensure_ascii=False)  # 데이터를 JSON 문자열로 변환

        return HttpResponse(response_data, content_type="application/json")
    
    else: 
        return JsonResponse({
            "result": "업로드 실패"
        })