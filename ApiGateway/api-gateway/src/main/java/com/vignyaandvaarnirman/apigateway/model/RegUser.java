package com.vignyaandvaarnirman.apigateway.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSetter;

public class RegUser {

    @JsonProperty(value = "first_name")
    String first_name;
    @JsonProperty(value = "last_name")
    String last_name;
    @JsonProperty(value = "email")
    String email;
    @JsonProperty(value = "password")
    String password;

    public String getfirst_Name() {
        return first_name;
    }

    public void setfirst_Name(String first_name) {
        this.first_name = first_name;
    }

    public String getlast_Name() {
        return last_name;
    }

    public void setlast_Name(String last_name) {
        this.last_name = last_name;
    }

    public String getemail() {
        return email;
    }

    public void setemail(String email) {
        this.email = email;
    }

    public String getpassword() {
        return password;
    }

    public void setpassword(String password) {
        this.password = password;
    }
}
