from django.shortcuts import render
from django.db import connection
from django.http import JsonResponse

import logging

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
logger.info("Hi 3 !!!!!!!!!")

# Create your views here.
def login_process(request):
    logger.info("Hi 4 !!!!!!!!!")
    if request.method == 'POST':
        print("1")
        email = request.POST['email']
        pw = request.POST['pw']
        print("2")
        with connection.cursor() as cursor:
            # 사용자 조회 쿼리 실행
            cursor.execute(
                "SELECT * FROM user_list WHERE email = %s AND pw = %s",
                (email, pw)
            )
            result = cursor.fetchone()
            print("3")
            if result:
                return JsonResponse({'message': 'Login successful'})
            else:
                # 사용자가 존재하지 않는 경우
                # ...
                return JsonResponse({'message': 'Login failed'})