package com.vignyaandvaarnirman.apigateway;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.scheduling.annotation.EnableScheduling;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.Channel;

@SpringBootApplication
public class ApiGatewayApplication {
    static String path;
    @Profile("main-app")
    @Bean
    public CommandLineRunner usage() {
        return args -> {
            System.out.println("This app uses Spring Profiles to control its behavior.\n");
            System.out.println("Sample usage: java -jar rabbit-tutorials.jar --spring.profiles.active=hello-world,sender");
        };
    }

    @Profile("!main-app")
    @Bean
    public CommandLineRunner tutorial() {
        return args -> {
            System.out.println("API Gateway Started!!");
        };
    }
    public static void main(String[] args) throws IOException, TimeoutException, InterruptedException{
        SpringApplication.run(ApiGatewayApplication.class, args);
        FromModelListener listener=new FromModelListener();
        path=listener.receive();
    }

    public static String getPath() {
        System.out.println("Path is being fetched: "+path);
        return path;
    }

    public static void setPath(String path) {
        ApiGatewayApplication.path = path;
    }
}
