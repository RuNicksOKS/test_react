# FROM python:3.8.8-slim # (이전 버전) Python 3.8.8 slim 이미지 사용 예시
# Python 3.12.1 slim 이미지 사용
FROM python:3.12.1-slim

# 작업 디렉토리 설정
WORKDIR /usr/workspace

# 파이썬 바이트코드 파일 생성 방지
ENV PYTHONDONTWRITEBYTECODE 1
# 파이썬 출력 버퍼링 비활성화
ENV PYTHONUNBUFFERED 1

# 필요한 패키지 설치
RUN apt-get update \
    && apt-get install -y python3-dev gcc musl-dev libffi-dev netcat-openbsd \
    curl wget unzip ca-certificates

# Cursor 서버 설치 (안정적인 방법)
RUN curl -fsSL https://download.cursor.sh/linux/cursor-latest-linux-x64.tar.gz -o cursor.tar.gz \
    && tar -xzf cursor.tar.gz -C /usr/local/bin --strip-components=1 \
    && rm cursor.tar.gz \
    && chmod +x /usr/local/bin/cursor

# pip 최신 버전으로 업그레이드
RUN pip install --upgrade pip
# requirements 폴더 복사
COPY ./requirements ./requirements
# 로컬 환경 패키지 설치
RUN pip install -r requirements/local.txt

# 모든 소스 파일을 컨테이너로 복사
COPY . .

# 컨테이너 시작 시 entrypoint.sh 실행
ENTRYPOINT ["/usr/workspace/entrypoint.sh"]
