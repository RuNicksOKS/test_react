#!/bin/sh

# 데이터베이스 연결 대기
if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

# Poetry 가상환경 활성화
export PATH="/usr/workspace/.venv/bin:$PATH"

# 데이터베이스 마이그레이션
poetry run python manage.py migrate --noinput

# 정적 파일 수집 (이미 빌드 시점에 완료됨)
# poetry run python manage.py collectstatic --noinput

# 보안 검사
poetry run python manage.py check --deploy

# 실행
exec "$@"