package com.vignyaandvaarnirman.apigateway.controller;

import com.rabbitmq.client.AMQP;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import java.io.IOException;
import java.util.UUID;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.TimeoutException;

public class ToSession  {

    private final static String QUEUE_NAME = "toSession";
    String result="Kuch nai mila!";

    public String send(String user_id) {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("rabbimq-server");
        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {
            channel.queueDeclare(QUEUE_NAME, true, false, false, null);
            channel.basicPublish("", QUEUE_NAME, null, user_id.getBytes());
            System.out.println(" [x] Sent '" + user_id + "'");
            FromSession fromSession = new FromSession();
            result = fromSession.receive();
        } catch (IOException | TimeoutException | InterruptedException e) {
            e.printStackTrace();
        }
        return result;
    }
}
