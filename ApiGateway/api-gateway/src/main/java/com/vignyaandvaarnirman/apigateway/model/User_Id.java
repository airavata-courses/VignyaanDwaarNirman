package com.vignyaandvaarnirman.apigateway.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class User_Id {

    @JsonProperty(value = "user_id")
    String user_id;

    public String getUserId() {
        return user_id;
    }

    public void setUserId(String user_id) {
        this.user_id = user_id;
    }
}
