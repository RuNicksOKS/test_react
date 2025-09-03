#!/bin/bash

# EC2 프로덕션 배포 스크립트

set -e  # 오류 시 스크립트 중단

# 프로젝트 루트 경로 설정
PROJECT_ROOT=${PROJECT_ROOT:-$(pwd)}
COMPOSE_FILE="${PROJECT_ROOT}/deploy/configs/docker/docker-compose.prod.yml"

echo "🚀 EC2 프로덕션 배포 시작..."
echo "📁 프로젝트 루트: ${PROJECT_ROOT}"
echo "📄 Compose 파일: ${COMPOSE_FILE}"

# 환경 변수 파일 확인
if [ ! -f "${PROJECT_ROOT}/env/.env.prod" ]; then
    echo "❌ .env.prod 파일이 없습니다!"
    echo "📝 환경 변수 파일을 생성해주세요."
    exit 1
fi

if [ ! -f "${PROJECT_ROOT}/env/.env.prod.db" ]; then
    echo "❌ .env.prod.db 파일이 없습니다!"
    echo "📝 데이터베이스 환경 변수 파일을 생성해주세요."
    exit 1
fi

# SSL 인증서 확인 및 생성
if [ ! -f "${PROJECT_ROOT}/deploy/configs/nginx/ssl/cert.pem" ] || [ ! -f "${PROJECT_ROOT}/deploy/configs/nginx/ssl/key.pem" ]; then
    echo "⚠️  SSL 인증서가 없습니다. 자체 서명 인증서를 생성합니다..."
    mkdir -p "${PROJECT_ROOT}/deploy/configs/nginx/ssl"
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout "${PROJECT_ROOT}/deploy/configs/nginx/ssl/key.pem" \
        -out "${PROJECT_ROOT}/deploy/configs/nginx/ssl/cert.pem" \
        -subj "/C=KR/ST=Seoul/L=Seoul/O=DevLoper/CN=localhost"
    echo "✅ 자체 서명 SSL 인증서 생성 완료"
fi

# Docker 서비스 상태 확인
echo "🔍 Docker 서비스 상태 확인..."
if ! systemctl is-active --quiet docker; then
    echo "❌ Docker 서비스가 실행되지 않았습니다. 시작 중..."
    sudo systemctl start docker
    sudo systemctl enable docker
fi

# 기존 컨테이너 정리
echo "🧹 기존 컨테이너 정리..."
docker-compose -f "${COMPOSE_FILE}" down --remove-orphans

# 기존 이미지 정리 (선택사항)
read -p "기존 Docker 이미지를 모두 삭제하시겠습니까? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🗑️  기존 이미지 삭제 중..."
    docker system prune -af
fi

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

# 시스템 리소스 확인
echo "💻 시스템 리소스 확인..."
echo "메모리 사용량:"
free -h
echo ""
echo "디스크 사용량:"
df -h
echo ""
echo "Docker 사용량:"
docker system df

echo "✅ EC2 프로덕션 배포 완료!"
echo "🌐 접속 URL: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)"
echo "📊 모니터링: docker-compose -f \"${COMPOSE_FILE}\" logs -f"
echo "🔧 컨테이너 관리: docker-compose -f \"${COMPOSE_FILE}\" ps"
