package com.vignyaandvaarnirman.apigateway.controller;

import com.vignyaandvaarnirman.apigateway.model.*;
import org.springframework.amqp.core.FanoutExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import javax.validation.Valid;

@RestController
@EnableRabbit
@RequestMapping("/users")
public class APIController {

    String model_res;

    @Bean
    public Queue myQueue() {
        return new Queue("apiData");
    }

    @RabbitListener(queues = "apiData")
    public void receive1(String in) throws InterruptedException {
        this.model_res = in;
    }

    @PostMapping("/login")
    public String postUserLoginDetails(@RequestBody LoginUser user) {
        //TODO: Add User Management
        RestTemplate restTemplate = new RestTemplate();
        JWToken jwToken = restTemplate.postForObject("https://localhost:5000/users",user, JWToken.class);
        return jwToken.getJwt();
    }
    @GetMapping("/profile")
    public ProfileUser getUserDetails(@RequestBody JWToken jwToken) {
        //TODO : Add User Management
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject("https://localhost:5000/users",ProfileUser.class,jwToken);
    }

    @PostMapping("/register")
    public String postUserRegisterationDetails(@RequestBody RegUser regUser) {
        //TODO: Add User Management
        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.postForObject("https://localhost:5000/users",regUser, String.class);
        return response;
    }

    @GetMapping("/session")
    public String getSessionDetails(@RequestBody UserId uid) {
        ToSession toSession = new ToSession();
        return toSession.send(uid);
    }

    @GetMapping("/dashboard")
    public String getBottomData(@RequestBody Data data) {
        //TODO: Add Data Manipulation
        ToDataR toDataR = new ToDataR();
        toDataR.send(data);
        return this.model_res;
    }

}
