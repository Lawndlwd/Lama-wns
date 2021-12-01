FROM node:alpine

ARG ACCESS_TOKEN
ARG REFRESH_TOKEN

ENV ACCESS_TOKEN=${ACCESS_TOKEN}
ENV REFRESH_TOKEN=${REFRESH_TOKEN}

RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY tsconfig.json tsconfig.json
COPY src src

CMD npm start
