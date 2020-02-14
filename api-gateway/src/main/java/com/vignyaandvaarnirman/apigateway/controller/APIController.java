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
import java.io.IOException;
import java.util.concurrent.TimeoutException;

@RestController
@EnableRabbit
@RequestMapping("/users")
public class APIController {

//    String model_res;
//
//    public String getModel_res() {
//        return model_res;
//    }
//
//    public void setModel_res(String model_res) {
//        this.model_res = model_res;
//    }

//    @Bean
//    public Queue myQueue() {
//        return new Queue("apiData");
//    }
//
//    @RabbitListener(queues = "apiData")
//    public void receive1(String in) throws InterruptedException {
//        this.model_res = in;
//    }

    @PostMapping(value = "/login")
    public String postUserLoginDetails(@RequestBody LoginUser user) {
        //TODO: Add User Management
        RestTemplate restTemplate = new RestTemplate();
         return restTemplate.postForObject("http://localhost:5000/users/login",user, String.class);
    }
    @GetMapping(value = "/profile")
    public ProfileUser getUserDetails(@RequestBody JWToken jwToken) {
        //TODO : Add User Management
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject("http://localhost:5000/users/profile",ProfileUser.class,jwToken);
    }

    @PostMapping(value = "/register")
    public String postUserRegisterationDetails(@RequestBody RegUser regUser) {
        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.postForObject("http://localhost:5000/users/register",regUser, String.class);
        return response;
    }

    @GetMapping(value = "/session")
    public String getSessionDetails(@RequestBody UserId uid) {
        ToSession toSession = new ToSession();
        toSession.uid = uid;
        String res = toSession.send();
        return res;
    }

    @PostMapping(value = "/dashboardsearch")
    public String getBottomData(@RequestBody Data data) throws IOException, TimeoutException, InterruptedException {
        System.out.println("Dashboard data: "+ data.toString());
        ToDataR toDataR = new ToDataR();
        toDataR.send(data);
        System.out.println("Trying to create listener");
        FromModelListener listener = new FromModelListener();
        System.out.println("Listener Created");
        String path = listener.receive();
        System.out.println("Sent to front-end: "+path);
        return path;
    }

}
