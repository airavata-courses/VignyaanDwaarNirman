package com.vignyaandvaarnirman.apigateway.controller;

import com.vignyaandvaarnirman.apigateway.model.UserId;
import com.rabbitmq.client.AMQP;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import java.io.IOException;
import java.util.UUID;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.TimeoutException;

public class ToSession implements AutoCloseable {

    UserId uid;

    private Connection connection;
    private Channel channel;
    private String requestQueueName = "toSession";

    public ToSession() throws IOException, TimeoutException {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");

        connection = factory.newConnection();
        channel = connection.createChannel();
    }



    public String send() throws Exception {
        try (ToSession fibonacciRpc = new ToSession()) {
            System.out.println(" [x] Requesting response(" +uid.getUserId()+ ")");
            String response = fibonacciRpc.call(uid.getUserId());
            System.out.println(" [.] Got '" + response + "'");
            return response;
        }
        catch (IOException | TimeoutException | InterruptedException e) {
            e.printStackTrace();
        }
        return "Kuch nai mila!!";
    }
    public String call(String message) throws IOException, InterruptedException {
        final String corrId = UUID.randomUUID().toString();

        String replyQueueName = channel.queueDeclare().getQueue();
        AMQP.BasicProperties props = new AMQP.BasicProperties
                .Builder()
                .correlationId(corrId)
                .replyTo(replyQueueName)
                .build();

        channel.basicPublish("", requestQueueName, props, message.getBytes("UTF-8"));

        final BlockingQueue<String> response = new ArrayBlockingQueue<>(1);

        String ctag = channel.basicConsume(replyQueueName, true, (consumerTag, delivery) -> {
            if (delivery.getProperties().getCorrelationId().equals(corrId)) {
                response.offer(new String(delivery.getBody(), "UTF-8"));
            }
        }, consumerTag -> {
        });

        String result = response.take();
        channel.basicCancel(ctag);
        return result;
    }

    public void close() throws IOException {
        connection.close();
    }
}
