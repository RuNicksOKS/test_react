from django.urls import path
from .views import login_process

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
logger.info("Hi 2 !!!!!!!!!")

urlpatterns = [
  path('process/', login_process),
]