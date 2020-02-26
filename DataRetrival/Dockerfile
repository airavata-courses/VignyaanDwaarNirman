FROM python:latest

COPY ./src

WORKDIR /src

RUN \
    pip install requirements.txt \
    npm install node-gyp-pre \

EXPOSE 3000

CMD npm start