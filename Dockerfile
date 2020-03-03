FROM ubuntu:latest
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
RUN echo "deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen" | sudo tee /etc/apt/sources.list.d/mongodb.list
RUN apt-get install -y mongodb-org
VOLUME ["/data/db"]
WORKDIR /data
EXPOSE 27017
CMD ["mongod"]