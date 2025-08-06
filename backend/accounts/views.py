from django.shortcuts import render
from django.db import connection
from django.http import JsonResponse

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
            # email = request.POST['email']
            # pw = request.POST['pw']
            with connection.cursor() as cursor:
                # 사용자 조회 쿼리 실행
                cursor.execute(
                    "SELECT * FROM user_info WHERE email = %s AND pw = %s",
                    (email, pw)
                )
                result = cursor.fetchone()
                if result:
                    return JsonResponse({'message': 'Login successful'})
                else:
                    # 사용자가 존재하지 않는 경우
                    # ...
                    return JsonResponse({'message': 'Login failed'})
        except KeyError as e:
            # 'email' 또는 'pw' 매개변수가 요청에 없을 때
            return JsonResponse({'message': f'Missing parameter: {e}'}, status=400)
    else:
        # POST 요청이 아닌 경우
        return JsonResponse({'message': 'Invalid request method'}, status=405)
    