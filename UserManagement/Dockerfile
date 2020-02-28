FROM node:alpine

COPY . /src

WORKDIR /src

RUN \
    npm install  


EXPOSE 5000

CMD ["npm", "rebuild"]

CMD ["node", "server.js"]