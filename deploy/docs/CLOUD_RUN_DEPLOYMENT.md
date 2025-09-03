# Google Cloud Run 배포 가이드

이 문서는 Enitec 프론트엔드를 Google Cloud Run에 배포하는 방법을 설명합니다.

## 📋 사전 요구사항

1. **Google Cloud 계정 및 프로젝트**
   - Google Cloud Console에 로그인
   - 새 프로젝트 생성 또는 기존 프로젝트 선택

2. **Google Cloud CLI (gcloud) 설치**
   ```bash
   # macOS
   brew install google-cloud-sdk
   
   # Ubuntu/Debian
   curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
   echo "deb https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
   sudo apt-get update && sudo apt-get install google-cloud-sdk
   
   # Windows
   # https://cloud.google.com/sdk/docs/install#windows 에서 다운로드
   ```

3. **Docker 설치**
   - [Docker Desktop](https://www.docker.com/products/docker-desktop) 또는 Docker Engine

## 🚀 배포 방법

### 방법 1: 자동화 스크립트 사용 (권장)

1. **gcloud 로그인**
   ```bash
   gcloud auth login
   gcloud auth application-default login
   ```

2. **프로젝트 설정**
   ```bash
   gcloud config set project YOUR_PROJECT_ID
   ```

3. **배포 스크립트 실행**
   ```bash
   cd frontend
   chmod +x deploy-cloudrun.sh
   ./deploy-cloudrun.sh YOUR_PROJECT_ID asia-northeast1
   ```

### 방법 2: 수동 배포

1. **도커 이미지 빌드**
   ```bash
   cd frontend
   docker build -f Dockerfile.cloudrun -t gcr.io/YOUR_PROJECT_ID/enitec-frontend:latest .
   ```

2. **Container Registry에 푸시**
   ```bash
   docker push gcr.io/YOUR_PROJECT_ID/enitec-frontend:latest
   ```

3. **Cloud Run에 배포**
   ```bash
   gcloud run deploy enitec-frontend \
       --image gcr.io/YOUR_PROJECT_ID/enitec-frontend:latest \
       --region asia-northeast1 \
       --platform managed \
       --allow-unauthenticated \
       --port 8080 \
       --memory 512Mi \
       --cpu 1
   ```

### 방법 3: Cloud Build 사용

1. **Cloud Build API 활성화**
   ```bash
   gcloud services enable cloudbuild.googleapis.com
   ```

2. **빌드 트리거 설정 및 실행**
   ```bash
   gcloud builds submit --config cloudbuild.yaml
   ```

## ⚙️ 설정 옵션

### 리소스 설정
- **메모리**: 512Mi (기본값), 1Gi, 2Gi, 4Gi, 8Gi, 16Gi, 32Gi
- **CPU**: 1 (기본값), 2, 4, 8
- **최대 인스턴스**: 10 (기본값), 100, 1000
- **최소 인스턴스**: 0 (기본값), 1, 10

### 환경 변수
```bash
NODE_ENV=production
PORT=8080
```

### 커스텀 도메인 설정
```bash
gcloud run domain-mappings create \
    --service enitec-frontend \
    --domain your-domain.com \
    --region asia-northeast1
```

## 🔍 모니터링 및 로그

### 로그 확인
```bash
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=enitec-frontend" --limit=50
```

### 메트릭 확인
```bash
gcloud run services describe enitec-frontend --region=asia-northeast1
```

## 💰 비용 최적화

1. **최소 인스턴스를 0으로 설정** (콜드 스타트 허용)
2. **적절한 메모리/CPU 설정** (사용량에 맞게 조정)
3. **최대 인스턴스 제한** (비용 폭증 방지)

## 🚨 문제 해결

### 일반적인 문제들

1. **권한 오류**
   ```bash
   gcloud auth application-default login
   gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
       --member="user:YOUR_EMAIL" \
       --role="roles/run.admin"
   ```

2. **포트 충돌**
   - Cloud Run은 8080 포트를 사용해야 함
   - Dockerfile.cloudrun에서 EXPOSE 8080 확인

3. **메모리 부족**
   - 메모리 할당량 증가: `--memory 1Gi`

4. **빌드 실패**
   - Dockerfile.cloudrun 문법 확인
   - .dockerignore.cloudrun 파일 확인

### 디버깅
```bash
# 서비스 상태 확인
gcloud run services describe enitec-frontend --region=asia-northeast1

# 로그 스트리밍
gcloud run logs tail enitec-frontend --region=asia-northeast1

# 서비스 테스트
curl -v https://YOUR_SERVICE_URL
```

## 📚 추가 리소스

- [Cloud Run 공식 문서](https://cloud.google.com/run/docs)
- [Container Registry 문서](https://cloud.google.com/container-registry/docs)
- [Cloud Build 문서](https://cloud.google.com/cloud-build/docs)
- [gcloud CLI 참조](https://cloud.google.com/sdk/gcloud/reference)

## 🔄 업데이트 및 재배포

코드 변경 후 재배포:
```bash
./deploy-cloudrun.sh YOUR_PROJECT_ID asia-northeast1
```

또는 수동으로:
```bash
docker build -f Dockerfile.cloudrun -t gcr.io/YOUR_PROJECT_ID/enitec-frontend:latest .
docker push gcr.io/YOUR_PROJECT_ID/enitec-frontend:latest
gcloud run deploy enitec-frontend --image gcr.io/YOUR_PROJECT_ID/enitec-frontend:latest --region=asia-northeast1
```


