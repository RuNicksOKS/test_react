# Poetry 사용 가이드

## 빠른 시작

### 1. Poetry 설치
```bash
curl -sSL https://install.python-poetry.org | python3 -
```

### 2. 백엔드 의존성 설치
```bash
cd backend
poetry install
```

### 3. Django 서버 실행
```bash
poetry shell
python manage.py runserver
```

## 주요 명령어

### 의존성 관리
```bash
poetry add django          # 패키지 추가
poetry add --group dev pytest  # 개발 의존성 추가
poetry remove package-name     # 패키지 제거
poetry update                  # 패키지 업데이트
```

### Django 명령어
```bash
poetry run python manage.py runserver
poetry run python manage.py migrate
poetry run python manage.py createsuperuser
```

### Docker 사용
```bash
# 개발 환경
docker-compose up backend-dev

# 프로덕션 빌드
docker build --target production -t backend-prod ./backend
```

## 환경별 의존성

- **개발**: `poetry install --only=main,dev`
- **프로덕션**: `poetry install --only=main,prod`

## 파일 구조

```
backend/
├── pyproject.toml      # Poetry 설정
├── poetry.lock         # 의존성 잠금 파일
├── .venv/              # 가상환경 (자동 생성)
└── manage.py           # Django 관리 스크립트
```

## 장점

1. **자동 의존성 해결**: 버전 충돌 자동 해결
2. **가상환경 관리**: 자동 생성 및 관리
3. **환경별 분리**: dev/prod 의존성 분리
4. **Lock 파일**: 정확한 버전 고정
5. **단순함**: requirements.txt 불필요
