# 배포 파일 구조

이 폴더는 프로젝트의 모든 배포 관련 파일들을 체계적으로 관리하기 위해 구성되었습니다.

## 폴더 구조

```
deploy/
├── README.md          # 전체 구조 설명서
├── scripts/           # 실행 스크립트들
│   ├── ec2/           # EC2 배포 관련 스크립트
│   ├── cloud-run/     # Google Cloud Run 배포 스크립트
│   ├── docker/        # Docker 관련 스크립트
│   └── common/        # 공통 유틸리티 스크립트
├── configs/           # 설정 파일들
│   ├── docker/        # Docker Compose 설정
│   ├── nginx/         # Nginx 설정
│   └── cloud/         # 클라우드 서비스 설정
├── docs/              # 배포 문서들
│   └── checklists/    # 배포 체크리스트
└── templates/         # 배포 템플릿들
```

## 🔧 스크립트 파일들

### EC2 배포 스크립트 (`scripts/ec2/`)
- `ec2-deploy.sh` - 전체 EC2 배포 스크립트
- `ec2-deploy-frontend-only.sh` - 프론트엔드만 EC2에 배포
- `ec2-setup.sh` - EC2 초기 설정

### Cloud Run 배포 스크립트 (`scripts/cloud-run/`)
- `deploy-cloudrun.sh` - Google Cloud Run 배포

### Docker 스크립트 (`scripts/docker/`)
- `deploy-prod.sh` - 프로덕션 Docker 배포
- `start-portainer.sh` - Portainer 컨테이너 시작

### 공통 스크립트 (`scripts/common/`)
- `ssh-test.sh` - SSH 연결 테스트
- `web-console-troubleshoot.sh` - 웹 콘솔 문제 해결

## ⚙️ 설정 파일들

### Docker 설정 (`configs/docker/`)
- `docker-compose.yml` - 기본 Docker Compose 설정
- `docker-compose.prod.yml` - 프로덕션 Docker Compose 설정
- `docker-compose.frontend-only.yml` - 프론트엔드 전용 Docker Compose

### Nginx 설정 (`configs/nginx/`)
- `nginx.conf` - 메인 Nginx 설정
- `default.conf` - 기본 사이트 설정
- `ssl/` - SSL 인증서 파일들

### 클라우드 설정 (`configs/cloud/`)
- `cloudbuild.yaml` - Google Cloud Build 설정

## 문서들

### 메인 문서 (`docs/`)
- `EC2_DEPLOYMENT_GUIDE.md` - EC2 배포 가이드
- `FRONTEND_ONLY_DEPLOYMENT.md` - 프론트엔드 전용 배포 가이드
- `CLOUD_RUN_DEPLOYMENT.md` - Cloud Run 배포 가이드
- `POETRY_GUIDE.md` - Poetry 사용 가이드

### 체크리스트 (`docs/checklists/`)
- `EC2_DEPLOYMENT_CHECKLIST.md` - EC2 배포 체크리스트
- `FRONTEND_DEPLOYMENT_CHECKLIST.md` - 프론트엔드 배포 체크리스트

## 사용법

### EC2 배포
```bash
cd deploy/scripts/ec2
./ec2-deploy.sh
```

### Cloud Run 배포
```bash
cd deploy/scripts/cloud-run
./deploy-cloudrun.sh
```

### Docker 배포
```bash
cd deploy/scripts/docker
./deploy-prod.sh
```

## 참고사항

- 모든 스크립트는 실행 권한이 필요합니다 (`chmod +x *.sh`)
- 환경 변수나 설정 값은 각 스크립트 내에서 확인하세요
- 배포 전 반드시 체크리스트를 확인하세요
