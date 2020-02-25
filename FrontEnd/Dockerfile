FROM node:latest

COPY . /src

WORKDIR /src

RUN \
    npm install \
    npm install node-gyp-pre \

EXPOSE 3000

CMD npm start