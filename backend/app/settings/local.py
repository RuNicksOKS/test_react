from .base import *  # noqa

INSTALLED_APPS += [
    'corsheaders',
    'accounts',
]

MIDDLEWARE.insert(0, 'corsheaders.middleware.CorsMiddleware')
MIDDLEWARE.remove('django.middleware.csrf.CsrfViewMiddleware')

# CSRF_TRUSTED_ORIGINS = [
#     'http://localhost:3000',
#     'http://localhost:3001',
#     'http://localhost:8000',
#     'http://localhost:8001'
# ]

CORS_ORIGIN_WHITELIST = [
    'http://localhost:3000',
    'http://localhost:3001',  # 허용할 프론트엔드 도메인 및 포트
    'http://localhost:8000',
    'http://localhost:8001',
    # 다른 도메인 및 포트를 여기에 추가할 수 있음
]

# CORS 허용할 도메인 목록
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:8000',
    'http://localhost:8001'
    # 다른 도메인을 추가할 수 있습니다.
]

# 허용할 HTTP 메서드 목록
CORS_ALLOWED_METHODS = [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
    'OPTIONS',
]

SESSION_COOKIE_SECURE = True
# CSRF_COOKIE_HTTPONLY = True
CORS_ALLOW_CREDENTIALS = True # 자격 증명 허용
# CORS_ALLOW_ALL_ORIGINS = True # 와일드카드(*)를 사용하려면 주석 해제
# CORS_ALLOW_CREDENTIALS = True
# CSRF_COOKIE_SECURE = True
# CSRF_COOKIE_SAMESITE = 'Strict'