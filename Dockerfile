FROM node:alpine

COPY . /src

WORKDIR /src

RUN \
    npm install \
    && npm install nodemon

EXPOSE 7000

CMD npm run dev