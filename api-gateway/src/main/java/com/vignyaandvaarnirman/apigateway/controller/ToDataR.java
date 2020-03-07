package com.vignyaandvaarnirman.apigateway.controller;

import com.vignyaandvaarnirman.apigateway.model.Data;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.Channel;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

public class ToDataR {

    private final static String QUEUE_NAME = "searchParam";


    public void send(Data data) throws IOException, TimeoutException {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {
            channel.queueDeclare(QUEUE_NAME, false, false, false, null);
            StringBuilder builder = new StringBuilder();
            builder.append("{ \n");
            builder.append("\"radar_id\": \""+data.getRadar_id()+"\",\n");
            builder.append("\"start_date\": \""+data.getStart_date()+"\",\n");
            builder.append("\"end_date\": \""+data.getEnd_date()+"\",\n");
            builder.append("\"user_id\": \""+data.getUser_id()+"\",\n");
            builder.append("\"function_type\": \""+data.getFunc_type()+"\"\n");
            builder.append("}");
            String message = builder.toString();
            channel.basicPublish("", QUEUE_NAME, null, message.getBytes());
            System.out.println(" [x] Sent '" + message + "'");
        }
    }
}
