# Node.js 20 LTS slim 이미지를 development라는 이름으로 사용
FROM node:20-slim as development

# 작업 디렉토리 설정
WORKDIR /usr/workspace/ 

# 전체 소스 복사 (package.json과 package-lock.json 포함)
COPY . /usr/workspace/

# -- npm ci
# package-lock.json 기반으로 정확한 버전 설치
RUN npm ci

# 컨테이너 3000포트 오픈
EXPOSE 3000 

# 컨테이너 시작 시 npm start 실행
CMD npm start 
