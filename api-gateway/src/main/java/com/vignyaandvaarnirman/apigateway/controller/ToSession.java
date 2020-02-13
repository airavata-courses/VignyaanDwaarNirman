package com.vignyaandvaarnirman.apigateway.controller;

import com.vignyaandvaarnirman.apigateway.model.UserId;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;

public class ToSession {

    UserId uid;

    private RabbitTemplate rabbitTemplate = new RabbitTemplate();


    private Queue queue = new Queue("toSession");

    public String send(){
        return (String)this.rabbitTemplate.convertSendAndReceive(queue.getName(),this.uid);
    }
}
