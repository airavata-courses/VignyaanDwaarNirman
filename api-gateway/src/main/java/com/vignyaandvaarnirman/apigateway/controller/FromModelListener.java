package com.vignyaandvaarnirman.apigateway.controller;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;
import java.io.IOException;
import java.util.concurrent.TimeoutException;

public class FromModelListener {

    private final static String QUEUE_NAME = "apiData";

    String result;

    public FromModelListener() throws IOException, TimeoutException{
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        connection = factory.newConnection();
        channel = connection.createChannel();
    }
    public String receive() throws IOException, TimeoutException {
        System.out.println("Entered Recieve Method");
        channel.queueDeclare(QUEUE_NAME, true, false, false, null);
        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), "UTF-8");
            this.result = message;
            System.out.println("Result inside DCQ: "+result);
            System.out.println(" [x] Received and Set'" + message + "'");
        };
        System.out.println(" [*] Waiting for messages. To exit press CTRL+C");
        channel.basicConsume(QUEUE_NAME, true, deliverCallback, consumerTag -> { });
        System.out.println("Result outside DCQ: "+result);
        return result;
    }
}
