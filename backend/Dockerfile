# FROM python:3.8.8-slim
FROM python:3.12.1-slim

WORKDIR /usr/workspace

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update \
   && apt-get install -y python3-dev gcc musl-dev libffi-dev netcat-openbsd

RUN pip install --upgrade pip
COPY ./requirements ./requirements
RUN pip install -r requirements/local.txt

COPY . .

ENTRYPOINT ["/usr/workspace/entrypoint.sh"]
