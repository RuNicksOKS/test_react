# 프론트엔드 전용 배포 가이드

## 📋 개요

이 가이드는 프로젝트의 프론트엔드만 별도로 배포하는 방법을 설명합니다. 백엔드 서비스 없이 React 애플리케이션만 실행하고자 할 때 사용합니다.

## 🚀 사전 준비사항

### 필수 요구사항
- Docker 및 Docker Compose 설치
- Node.js 18+ (로컬 개발용)
- Git

### 권장 사양
- **메모리**: 최소 1GB RAM
- **스토리지**: 최소 10GB
- **포트**: 80, 443 (HTTPS)

## ⚙️ 배포 설정

### 1. 환경 변수 설정
```bash
# 환경 변수 파일 생성
cp env/.env.frontend.example env/.env.frontend

# 환경 변수 편집
nano env/.env.frontend
```

### 2. SSL 인증서 설정
```bash
# SSL 인증서 디렉토리 생성
mkdir -p deploy/configs/nginx/ssl

# 자체 서명 인증서 생성 (개발용)
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout deploy/configs/nginx/ssl/key.pem \
    -out deploy/configs/nginx/ssl/cert.pem \
    -subj "/C=KR/ST=Seoul/L=Seoul/O=DevLoper/CN=localhost"
```

## 🔧 배포 실행

### 1. 배포 스크립트 실행
```bash
# 스크립트 실행 권한 부여
chmod +x deploy/scripts/ec2/ec2-deploy-frontend-only.sh

# 배포 실행
./deploy/scripts/ec2/ec2-deploy-frontend-only.sh
```

### 2. 수동 배포 (스크립트 없이)
```bash
# 기존 컨테이너 정리
docker-compose -f deploy/configs/docker/docker-compose.frontend-only.yml down --remove-orphans

# 이미지 빌드
docker-compose -f deploy/configs/docker/docker-compose.frontend-only.yml build --no-cache

# 컨테이너 시작
docker-compose -f deploy/configs/docker/docker-compose.frontend-only.yml up -d
```

## 📊 모니터링 및 관리

### 서비스 상태 확인
```bash
# 컨테이너 상태
docker-compose -f deploy/configs/docker/docker-compose.frontend-only.yml ps

# 실시간 로그
docker-compose -f deploy/configs/docker/docker-compose.frontend-only.yml logs -f
```

### 로그 확인
```bash
# 전체 로그
docker-compose -f deploy/configs/docker/docker-compose.frontend-only.yml logs

# 최근 로그 (50줄)
docker-compose -f deploy/configs/docker/docker-compose.frontend-only.yml logs --tail=50
```

### 컨테이너 관리
```bash
# 서비스 재시작
docker-compose -f deploy/configs/docker/docker-compose.frontend-only.yml restart

# 서비스 중지
docker-compose -f deploy/configs/docker/docker-compose.frontend-only.yml stop

# 서비스 시작
docker-compose -f deploy/configs/docker/docker-compose.frontend-only.yml start
```

## 🔄 업데이트 및 유지보수

### 코드 업데이트
```bash
# 최신 코드 가져오기
git pull origin main

# 이미지 재빌드
docker-compose -f deploy/configs/docker/docker-compose.frontend-only.yml build --no-cache
docker-compose -f deploy/configs/docker/docker-compose.frontend-only.yml up -d
```

### 정적 파일 백업
```bash
# 정적 파일 백업
docker cp frontend-only:/usr/share/nginx/html ./frontend-backup

# 백업 압축
tar -czf frontend-backup-$(date +%Y%m%d).tar.gz frontend-backup/
```

## 🚨 문제 해결

### 일반적인 문제들

#### 1. 포트 충돌
```bash
# 포트 사용 확인
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :443

# 프로세스 종료
sudo kill -9 <PID>
```

#### 2. 메모리 부족
```bash
# 메모리 사용량 확인
free -h
docker system df

# 불필요한 이미지/컨테이너 정리
docker system prune -af
```

#### 3. SSL 인증서 문제
```bash
# 인증서 확인
openssl x509 -in deploy/configs/nginx/ssl/cert.pem -text -noout

# 자체 서명 인증서 재생성
./deploy/scripts/ec2/ec2-deploy-frontend-only.sh
```

### 로그 분석
```bash
# Nginx 로그
docker exec frontend-only tail -f /var/log/nginx/access.log
docker exec frontend-only tail -f /var/log/nginx/error.log

# 애플리케이션 로그
docker-compose -f deploy/configs/docker/docker-compose.frontend-only.yml logs -f
```

## 📞 지원 및 문의

### 문제 발생 시
1. 로그 확인
2. 시스템 리소스 상태 확인
3. 네트워크 연결 상태 확인
4. Docker 서비스 상태 확인

### 유용한 명령어
```bash
# 전체 시스템 상태
docker system df
docker ps -a
docker images

# 네트워크 상태
docker network ls
docker network inspect frontend-network

# 볼륨 상태
docker volume ls
```

## 🔗 관련 링크

- [Docker 공식 문서](https://docs.docker.com/)
- [Docker Compose 문서](https://docs.docker.com/compose/)
- [Nginx 문서](https://nginx.org/en/docs/)
- [React 배포 가이드](https://create-react-app.dev/docs/deployment/)
