#!/bin/bash

# 프로덕션 배포 스크립트

set -e  # 오류 시 스크립트 중단

# 프로젝트 루트 경로 설정
PROJECT_ROOT=${PROJECT_ROOT:-$(pwd)}
COMPOSE_FILE="${PROJECT_ROOT}/deploy/configs/docker/docker-compose.prod.yml"

echo "🚀 프로덕션 배포 시작..."
echo "📁 프로젝트 루트: ${PROJECT_ROOT}"
echo "📄 Compose 파일: ${COMPOSE_FILE}"

# 환경 변수 파일 확인
if [ ! -f "${PROJECT_ROOT}/env/.env.prod" ]; then
    echo "❌ .env.prod 파일이 없습니다!"
    exit 1
fi

if [ ! -f "${PROJECT_ROOT}/env/.env.prod.db" ]; then
    echo "❌ .env.prod.db 파일이 없습니다!"
    exit 1
fi

# SSL 인증서 확인
if [ ! -f "${PROJECT_ROOT}/deploy/configs/nginx/ssl/cert.pem" ] || [ ! -f "${PROJECT_ROOT}/deploy/configs/nginx/ssl/key.pem" ]; then
    echo "⚠️  SSL 인증서가 없습니다. 자체 서명 인증서를 생성합니다..."
    mkdir -p "${PROJECT_ROOT}/deploy/configs/nginx/ssl"
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout "${PROJECT_ROOT}/deploy/configs/nginx/ssl/key.pem" \
        -out "${PROJECT_ROOT}/deploy/configs/nginx/ssl/cert.pem" \
        -subj "/C=KR/ST=Seoul/L=Seoul/O=DevLoper/CN=localhost"
fi

# 기존 컨테이너 정리
echo "🧹 기존 컨테이너 정리..."
docker-compose -f "${COMPOSE_FILE}" down

# 이미지 빌드
echo "🔨 프로덕션 이미지 빌드..."
docker-compose -f "${COMPOSE_FILE}" build --no-cache

# 컨테이너 시작
echo "🚀 프로덕션 컨테이너 시작..."
docker-compose -f "${COMPOSE_FILE}" up -d

# 헬스체크 대기
echo "⏳ 서비스 헬스체크 대기..."
sleep 30

# 상태 확인
echo "📊 서비스 상태 확인..."
docker-compose -f "${COMPOSE_FILE}" ps

# 로그 확인
echo "📋 최근 로그 확인..."
docker-compose -f "${COMPOSE_FILE}" logs --tail=50

echo "✅ 프로덕션 배포 완료!"
echo "🌐 접속 URL: https://localhost"
echo "📊 모니터링: docker-compose -f \"${COMPOSE_FILE}\" logs -f"
