FROM node:latest

COPY ./src

WORKDIR /src

RUN \
    npm install \
    npm install node-gyp-pre \
    npm install bcrypt \
    npm install nodemon

EXPOSE 5000

CMD npm run dev