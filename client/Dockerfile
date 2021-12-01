FROM node:14.18.1

RUN mkdir /client
WORKDIR /client

COPY package*.json ./

RUN npm i

COPY public public
COPY tsconfig.json ./
COPY .cracorc.js ./
COPY tailwind.config.js ./
COPY src src

CMD npm start
