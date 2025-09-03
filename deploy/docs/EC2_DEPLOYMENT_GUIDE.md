# EC2 배포 가이드

## 📋 목차
1. [사전 준비사항](#사전-준비사항)
2. [EC2 인스턴스 설정](#ec2-인스턴스-설정)
3. [프로젝트 배포](#프로젝트-배포)
4. [모니터링 및 관리](#모니터링-및-관리)
5. [문제 해결](#문제-해결)

## 🚀 사전 준비사항

### 필수 요구사항
- AWS 계정 및 EC2 인스턴스
- SSH 키 페어
- 도메인 (선택사항)
- SSL 인증서 (선택사항)

### 권장 사양
- **인스턴스 타입**: t3.medium 이상
- **메모리**: 최소 2GB RAM
- **스토리지**: 최소 20GB
- **OS**: Ubuntu 20.04 LTS 이상

## ⚙️ EC2 인스턴스 설정

### 1. 보안 그룹 설정
```
인바운드 규칙:
- SSH (22): 0.0.0.0/0 또는 특정 IP
- HTTP (80): 0.0.0.0/0
- HTTPS (443): 0.0.0.0/0
- 개발용 포트 (3000, 8000): 0.0.0.0/0 (선택사항)
```

### 2. 인스턴스 시작
```bash
# SSH 연결
ssh -i your-key.pem ubuntu@your-ec2-ip

# 시스템 업데이트
sudo apt update && sudo apt upgrade -y
```

## 🔧 프로젝트 배포

### 1. 프로젝트 클론
```bash
git clone https://github.com/your-username/your-project.git
cd your-project
```

### 2. 환경 변수 설정
```bash
# 환경 변수 파일 생성
cp env/.env.prod.example env/.env.prod
cp env/.env.prod.db.example env/.env.prod.db

# 환경 변수 편집
nano env/.env.prod
nano env/.env.prod.db
```

### 3. Docker 설치 및 설정
```bash
# Docker 설치
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Docker Compose 설치
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 사용자 그룹에 추가
sudo usermod -aG docker $USER
newgrp docker
```

### 4. 프로젝트 배포
```bash
# 배포 스크립트 실행
chmod +x deploy/scripts/ec2/ec2-deploy.sh
./deploy/scripts/ec2/ec2-deploy.sh
```

## 📊 모니터링 및 관리

### 서비스 상태 확인
```bash
# 컨테이너 상태
docker-compose -f deploy/configs/docker/docker-compose.prod.yml ps

# 실시간 로그
docker-compose -f deploy/configs/docker/docker-compose.prod.yml logs -f
```

### 로그 확인
```bash
# 전체 로그
docker-compose -f deploy/configs/docker/docker-compose.prod.yml logs

# 특정 서비스 로그
docker-compose -f deploy/configs/docker/docker-compose.prod.yml logs -f frontend-prod
docker-compose -f deploy/configs/docker/docker-compose.prod.yml logs -f backend-prod
```

### 컨테이너 관리
```bash
# 서비스 재시작
docker-compose -f deploy/configs/docker/docker-compose.prod.yml restart

# 특정 서비스만 재시작
docker-compose -f deploy/configs/docker/docker-compose.prod.yml restart frontend-prod

# 서비스 중지
docker-compose -f deploy/configs/docker/docker-compose.prod.yml stop

# 서비스 시작
docker-compose -f deploy/configs/docker/docker-compose.prod.yml start
```

## 🔄 업데이트 및 유지보수

### 코드 업데이트
```bash
# 최신 코드 가져오기
git pull origin main

# 이미지 재빌드
docker-compose -f deploy/configs/docker/docker-compose.prod.yml pull
docker-compose -f deploy/configs/docker/docker-compose.prod.yml up -d
```

### 백업 및 복구
```bash
# 데이터베이스 백업
docker exec db-prod pg_dump -U postgres your_database > backup.sql

# 볼륨 백업
docker run --rm -v your_project_postgres_data:/data -v $(pwd):/backup alpine tar czf /backup/postgres_backup.tar.gz -C /data .
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

#### 3. 디스크 공간 부족
```bash
# 디스크 사용량 확인
df -h

# Docker 로그 정리
sudo journalctl --vacuum-time=3d
```

#### 4. SSL 인증서 문제
```bash
# 인증서 확인
openssl x509 -in deploy/configs/nginx/ssl/cert.pem -text -noout

# 자체 서명 인증서 재생성
./deploy/scripts/ec2/ec2-deploy.sh
```

### 로그 분석
```bash
# Nginx 로그
docker exec nginx-prod tail -f /var/log/nginx/access.log
docker exec nginx-prod tail -f /var/log/nginx/error.log

# 애플리케이션 로그
docker-compose -f deploy/configs/docker/docker-compose.prod.yml logs -f frontend-prod
docker-compose -f deploy/configs/docker/docker-compose.prod.yml logs -f backend-prod
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
docker network inspect prod

# 볼륨 상태
docker volume ls
docker volume inspect your_project_static_volume
```

## 🔗 관련 링크

- [Docker 공식 문서](https://docs.docker.com/)
- [Docker Compose 문서](https://docs.docker.com/compose/)
- [Nginx 문서](https://nginx.org/en/docs/)
- [PostgreSQL 문서](https://www.postgresql.org/docs/)
