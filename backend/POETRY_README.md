# Poetry 사용법 (Poetry 전용)

## Poetry 설치

```bash
# Poetry 설치
curl -sSL https://install.python-poetry.org | python3 -

# 또는 pip로 설치
pip install poetry
```

## 프로젝트 설정

### 초기 설정
```bash
cd backend
poetry install  # 모든 의존성 설치
```

### 가상환경 활성화
```bash
poetry shell  # 가상환경 활성화
python manage.py runserver  # Django 서버 실행
```

## 의존성 관리

### 개발 환경
```bash
# 개발 의존성 설치 (base + dev)
poetry install --only=main,dev

# 또는 간단히
poetry install
```

### 프로덕션 환경
```bash
# 프로덕션 의존성만 설치
poetry install --only=main,prod
```

### 새 패키지 추가
```bash
# 메인 의존성 추가
poetry add django

# 개발 의존성 추가
poetry add --group dev pytest

# 프로덕션 의존성 추가
poetry add --group prod gunicorn
```

### 패키지 제거
```bash
poetry remove package-name
```

### 의존성 업데이트
```bash
poetry update  # 모든 패키지 업데이트
poetry update django  # 특정 패키지만 업데이트
```

## Django 명령어 실행

```bash
# 가상환경에서 실행
poetry run python manage.py runserver
poetry run python manage.py migrate
poetry run python manage.py createsuperuser

# 또는 가상환경 활성화 후 실행
poetry shell
python manage.py runserver
```

## Docker에서 사용

```bash
# 개발 환경 빌드
docker build --target development -t backend-dev .

# 프로덕션 환경 빌드
docker build --target production -t backend-prod .

# Docker Compose로 실행
docker-compose up backend-dev
```

## Poetry 명령어 모음

```bash
# 프로젝트 정보
poetry show  # 설치된 패키지 목록
poetry show --tree  # 의존성 트리 보기

# 환경 정보
poetry env info  # 가상환경 정보
poetry env list  # 가상환경 목록

# 캐시 관리
poetry cache clear . --all  # 캐시 정리

# Lock 파일 관리
poetry lock  # poetry.lock 파일 업데이트
poetry lock --no-update  # 의존성 업데이트 없이 lock 파일만 생성
```

## 주요 장점

1. **의존성 해결**: 자동으로 버전 충돌 해결
2. **가상환경 관리**: 자동 생성 및 관리
3. **그룹별 의존성**: dev, prod 등 환경별 분리
4. **lock 파일**: 정확한 버전 고정
5. **빌드 시스템**: 패키지 배포까지 통합
6. **단순함**: requirements.txt 파일 관리 불필요
