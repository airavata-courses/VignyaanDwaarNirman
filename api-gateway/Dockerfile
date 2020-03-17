FROM openjdk:11.0.6-jre-slim-buster


ADD target/api-gateway-0.0.1-SNAPSHOT.jar api-gateway-0.0.1-SNAPSHOT.jar

EXPOSE 8090

CMD["mvn", "clean", "package"]
CMD ["java" , "-jar" , "api-gateway-0.0.1-SNAPSHOT.jar"]