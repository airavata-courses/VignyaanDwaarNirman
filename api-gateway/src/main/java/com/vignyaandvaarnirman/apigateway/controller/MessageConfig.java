package com.vignyaandvaarnirman.apigateway.controller;

import ch.qos.logback.core.net.server.Client;
import com.vignyaandvaarnirman.apigateway.controller.APIController;
import org.apache.catalina.Server;
import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Profile({"api","pub-sub"})
@Configuration
@EnableRabbit
public class MessageConfig {

    //This method takes data from both model execution micro-services
    @Profile("fromModel")
    private static class SessionDataConfig {

        @Bean
        public Queue queue() {
            return new Queue("apiData");
        }


        @Bean
        public APIController fromModel() {
            return new APIController();
        }

    }

    @Profile("toSession")
    private static class ToSessionConfig {

        @Bean
        public Queue queue() {
            return new Queue("toSession");
        }

        @Bean
        public ToSession toSession() {
            return new ToSession();
        }

        @Profile("toDataR")
        private static class ToDataRConfig {

            @Bean
            public Queue queue() {
                return new Queue("searchParam");
            }

            @Bean
            public ToDataR toSession() {
                return new ToDataR();
            }
        }
    }
}
