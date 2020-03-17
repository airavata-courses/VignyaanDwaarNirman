package com.vignyaandvaarnirman.apigateway.controller;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;
import java.io.IOException;
import java.util.concurrent.TimeoutException;

public class FromModelListener {

    private final static String QUEUE_NAME = "apiData";
    String result ;


    public String receive() throws IOException, TimeoutException, InterruptedException {
            ConnectionFactory factory = new ConnectionFactory();
            factory.setHost("rabbitmq-service");
            Connection connection = factory.newConnection();
            Channel channel = connection.createChannel();
            channel.queueDeclare(QUEUE_NAME, true, false, false, null);
            DeliverCallback deliverCallback = (consumerTag, delivery) -> {
                String message = new String(delivery.getBody(), "UTF-8");
                result = message;
                if(result != null && message != null){
                    System.out.println("Result inside DCQ: Image received");
                    System.out.println(" [x] Received and Set: Image");
                }
                else{
                    System.out.println("Result inside DCQ: null");
                    System.out.println("[x] Received and Set: null");
                }            
            };
            System.out.println(" [*] Waiting for messages. To exit press CTRL+C");
            channel.basicConsume(QUEUE_NAME, true, deliverCallback, consumerTag -> {
            });
             Thread.sleep(40000); //TODO: Add a better blocking mechanism
            if(result!=null) 
                System.out.println("Result outside DCQ: Image");
            else
                System.out.println("Result outside DCQ: null");
            return result;
    }
}
