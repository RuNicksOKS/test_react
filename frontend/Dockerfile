# Node.js LTS slim 이미지를 development라는 이름으로 사용
FROM node:lts-slim as development

# 작업 디렉토리 설정
WORKDIR /usr/workspace/ 

# Cursor 서버 설치 (안정적인 방법)
RUN apt-get update \
    && apt-get install -y curl wget unzip ca-certificates \
    && curl -fsSL https://download.cursor.sh/linux/cursor-latest-linux-x64.tar.gz -o cursor.tar.gz \
    && tar -xzf cursor.tar.gz -C /usr/local/bin --strip-components=1 \
    && rm cursor.tar.gz \
    && chmod +x /usr/local/bin/cursor \
    && rm -rf /var/lib/apt/lists/*

# package.json 복사
COPY package.json /usr/workspace/
# package-lock.json 복사
COPY package-lock.json /usr/workspace/

# -- npm install
# package-lock.json 기반으로 의존성 설치
RUN npm ci
# RUN npm install -g npm@9.7.1 # (주석) npm 글로벌 업그레이드 예시

# -- module install (material)
# RUN npm install @material-ui/core --legacy-peer-deps # (주석) material-ui core 설치 예시
# RUN npm install @material-ui/icons --legacy-peer-deps # (주석) material-ui icons 설치 예시
# RUN npm install @mui/material @emotion/react @emotion/styled --legacy-peer-deps # (주석) MUI 설치 예시
# RUN npm install @mui/base --legacy-peer-deps # (주석) MUI base 설치 예시
# RUN npm install @mui/material @emotion/react @emotion/styled # (주석) MUI 설치 예시

# -- module install

# 전체 소스 복사
COPY . /usr/workspace/ 

# 라이브러리 설치 스크립트 실행 예시
# RUN chmod +x install-libraries.sh && ./install-libraries.sh

# 컨테이너 3000포트 오픈
EXPOSE 3000 

# 컨테이너 시작 시 npm start 실행
CMD npm start 

# FROM nginx:1.24.0-alpine # (주석) Nginx 이미지 사용 예시
# COPY --from=development . /usr/share/nginx/html # (주석) 빌드 결과를 Nginx로 복사 예시
# RUN npm ci # (주석) Nginx에서 npm ci 실행 예시
# RUN rm /etc/nginx/conf.d/default.conf # (주석) 기본 Nginx 설정 삭제 예시
# COPY nginx/nginx.conf /etc/nginx/conf.d # (주석) 사용자 정의 Nginx 설정 복사 예시
# EXPOSE 3000 # (주석) Nginx 컨테이너 3000포트 오픈 예시
# CMD ["nginx", "-g", "daemon off;"] # (주석) Nginx 실행 명령 예시