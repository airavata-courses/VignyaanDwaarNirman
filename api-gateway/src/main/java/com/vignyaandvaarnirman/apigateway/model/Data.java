package com.vignyaandvaarnirman.apigateway.model;

public class Data {

    String radar_id;
    String start_date;
    String end_date;
    String user_id;
    String func_type;

    public String getRadar_id() {
        return radar_id;
    }

    public void setRadar_id(String radar_id) {
        this.radar_id = radar_id;
    }

    public String getStart_date() {
        return start_date;
    }

    public void setStart_date(String start_date) {
        this.start_date = start_date;
    }

    public String getEnd_date() {
        return end_date;
    }

    public void setEnd_date(String end_date) {
        this.end_date = end_date;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getFunc_type() {
        return func_type;
    }

    public void setFunc_type(String func_type) {
        this.func_type = func_type;
    }
}
