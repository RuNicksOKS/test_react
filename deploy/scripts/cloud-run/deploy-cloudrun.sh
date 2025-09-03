#!/bin/bash

# Google Cloud Run 배포 스크립트
# 사용법: ./deploy-cloudrun.sh [프로젝트ID] [지역]

set -e

# 기본값 설정
PROJECT_ID=${1:-"your-project-id"}
REGION=${2:-"asia-northeast1"}
SERVICE_NAME="enitec-frontend"

echo "🚀 Google Cloud Run 배포를 시작합니다..."
echo "프로젝트 ID: $PROJECT_ID"
echo "지역: $REGION"
echo "서비스 이름: $SERVICE_NAME"

# 현재 디렉토리가 frontend 폴더인지 확인
if [ ! -f "package.json" ]; then
    echo "❌ frontend 폴더에서 실행해주세요."
    exit 1
fi

# gcloud 로그인 확인
echo "🔐 gcloud 인증 상태를 확인합니다..."
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    echo "❌ gcloud에 로그인되어 있지 않습니다. 'gcloud auth login'을 실행해주세요."
    exit 1
fi

# 프로젝트 설정
echo "📁 프로젝트를 설정합니다..."
gcloud config set project $PROJECT_ID

# Container Registry API 활성화
echo "🔧 Container Registry API를 활성화합니다..."
gcloud services enable containerregistry.googleapis.com

# Cloud Run API 활성화
echo "🔧 Cloud Run API를 활성화합니다..."
gcloud services enable run.googleapis.com

# 도커 이미지 빌드
echo "🐳 도커 이미지를 빌드합니다..."
docker build -f Dockerfile.cloudrun -t gcr.io/$PROJECT_ID/$SERVICE_NAME:latest .

# Container Registry에 푸시
echo "📤 이미지를 Container Registry에 푸시합니다..."
docker push gcr.io/$PROJECT_ID/$SERVICE_NAME:latest

# Cloud Run에 배포
echo "🚀 Cloud Run에 배포합니다..."
gcloud run deploy $SERVICE_NAME \
    --image gcr.io/$PROJECT_ID/$SERVICE_NAME:latest \
    --region $REGION \
    --platform managed \
    --allow-unauthenticated \
    --port 8080 \
    --memory 512Mi \
    --cpu 1 \
    --max-instances 10 \
    --min-instances 0 \
    --set-env-vars NODE_ENV=production

# 배포 완료 후 서비스 URL 출력
echo "✅ 배포가 완료되었습니다!"
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region=$REGION --format="value(status.url)")
echo "🌐 서비스 URL: $SERVICE_URL"

# 헬스체크
echo "🏥 서비스 헬스체크를 수행합니다..."
sleep 10
if curl -f "$SERVICE_URL" > /dev/null 2>&1; then
    echo "✅ 서비스가 정상적으로 응답하고 있습니다."
else
    echo "❌ 서비스 응답에 문제가 있을 수 있습니다."
fi


