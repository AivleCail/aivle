Django model server 입니다

실행 방법

1. 가상환경 생성
2. 가상환경 활성화
3. model 폴더로 경로 이동 (CaiL/model/)
3. 패키지 일괄 설치
4. migrate
5. 서버 실행

```
$ conda create -n cail python=3.10.11
$ conda activate cail
$ cd model
$ pip install -r requirements.txt
$ python manage.py migrate
$ python manage.py runserver

```

whisper API를 사용하고 있기 때문에 api key를 입력 해주어야합니다. (유료)
CaiL/model/mysettings.py
OPENAI_API_KEY = '개인 api key'