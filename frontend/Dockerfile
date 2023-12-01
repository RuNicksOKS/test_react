FROM node:lts-slim as development

WORKDIR /workspace/

COPY package.json /workspace/
COPY package-lock.json /workspace/

# -- npm install
RUN npm ci
# RUN npm install -g npm@9.7.1

# -- module install (material)
# RUN npm install @material-ui/core --legacy-peer-deps
# RUN npm install @material-ui/icons --legacy-peer-deps
# RUN npm install @mui/material @em otion/react @emotion/styled --legacy-peer-deps
# RUN npm install @mui/base --legacy-peer-deps
# RUN npm install @mui/material @emotion/react @emotion/styled

# -- module install

COPY . /workspace/

# 라이브러리 설치 스크립트 실행
RUN chmod +x install-libraries.sh && ./install-libraries.sh

EXPOSE 3000

CMD npm start


# FROM nginx:1.24.0-alpine
# COPY --from=development . /usr/share/nginx/html
# RUN npm ci
# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx/nginx.conf /etc/nginx/conf.d
# EXPOSE 3000
# CMD ["nginx", "-g", "daemon off;"]