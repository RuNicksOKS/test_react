from django.shortcuts import render
from django.db import connection
from django.http import JsonResponse
from .models import UserList

import logging
import json

# 로그 설정
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# 콘솔 핸들러 생성
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.INFO)

# 로그 포맷 설정
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
console_handler.setFormatter(formatter)

# 핸들러를 로거에 추가
logger.addHandler(console_handler)

# 로그 출력
# logger.info("message")

# Create your views here.
def login_process(request):
    if request.method == 'POST':
        try:
            # JSON 데이터를 디코딩
            data = json.loads(request.body)
            email = data['email']
            pw = data['pw']
            
            # Django 모델을 사용하여 사용자 조회
            try:
                user = UserList.objects.get(email=email, pw=pw)
                return JsonResponse({'message': 'Login successful'})
            except UserList.DoesNotExist:
                return JsonResponse({'message': 'Login failed'})
                
        except KeyError as e:
            # 'email' 또는 'pw' 매개변수가 요청에 없을 때
            return JsonResponse({'message': f'Missing parameter: {e}'}, status=400)
    else:
        # POST 요청이 아닌 경우
        return JsonResponse({'message': 'Invalid request method'}, status=405)

# 회원가입 처리
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def signup_process(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data['email']
            pw = data['pw']
            
            # 이메일 중복 체크
            if UserList.objects.filter(email=email).exists():
                return JsonResponse({'message': '이미 존재하는 이메일입니다.'}, status=400)
            
            # 회원 정보 저장
            UserList.objects.create(email=email, pw=pw)
            return JsonResponse({'message': '회원가입 성공'})
            
        except Exception as e:
            return JsonResponse({'message': f'오류 발생: {str(e)}'}, status=500)
    else:
        return JsonResponse({'message': 'Invalid request method'}, status=405)
    