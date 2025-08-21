# FROM python:3.8.8-slim # (이전 버전) Python 3.8.8 slim 이미지 사용 예시
# Python 3.12.2 slim 이미지 사용
FROM python:3.12.2-slim as development

# Poetry 설치
RUN pip install poetry

# Poetry 설정 (가상환경 생성 안함)
ENV POETRY_NO_INTERACTION=1 \
    POETRY_VENV_IN_PROJECT=1 \
    POETRY_CACHE_DIR=/tmp/poetry_cache

# 작업 디렉토리 설정
WORKDIR /usr/workspace

# 파이썬 바이트코드 파일 생성 방지
ENV PYTHONDONTWRITEBYTECODE=1
# 파이썬 출력 버퍼링 비활성화
ENV PYTHONUNBUFFERED=1

# 필요한 패키지 설치
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        python3-dev \
        gcc \
        musl-dev \
        libffi-dev \
        netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

# Poetry 설정 파일 복사
COPY pyproject.toml ./

# Lock 파일이 없으면 생성하고 의존성 설치
RUN if [ ! -f poetry.lock ]; then poetry lock; fi && \
    poetry install --only=main,dev

# 모든 소스 파일을 컨테이너로 복사
COPY . .

# Poetry 가상환경 활성화
ENV PATH="/usr/workspace/.venv/bin:$PATH"

# 컨테이너 시작 시 entrypoint.sh 실행
ENTRYPOINT ["/usr/workspace/entrypoint.sh"]