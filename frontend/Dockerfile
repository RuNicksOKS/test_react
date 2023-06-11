FROM node:lts-slim

WORKDIR /app/

COPY package.json /app/
COPY package-lock.json /app/

# -- npm install
# RUN npm ci
RUN npm install -g npm@9.7.1

# -- module install (material)
# RUN npm install @material-ui/core --legacy-peer-deps
# RUN npm install @material-ui/icons --legacy-peer-deps
# RUN npm install @mui/material @em otion/react @emotion/styled --legacy-peer-deps
# RUN npm install @mui/base --legacy-peer-deps
RUN npm install @mui/material @emotion/react @emotion/styled


# -- module install

COPY . /app/

EXPOSE 3000

CMD npm start
