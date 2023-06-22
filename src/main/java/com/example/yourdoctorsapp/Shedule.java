package com.example.yourdoctorsapp;

import java.math.BigDecimal;

import jakarta.persistence.*;

@Entity
@Table(name = "shedule")
public class Shedule {

    @Column(name="amka")
    @Id
    private BigDecimal amka;

    @Column(name="monday")
    private String monday;

    @Column(name="tuesday")
    private String tuesday;

    @Column(name="wednesday")
    private String wednesday;

    @Column(name="thursday")
    private String thursday;

    @Column(name="friday")
    private String friday;

    @Column(name="saturday")
    private String saturday;

    @Column(name="sunday")
    private String sunday;

    public Shedule() {
    }

    public BigDecimal getAmka() {
        return amka;
    }

    public void setAmka(BigDecimal amka) {
        this.amka = amka;
    }

    public String getMonday() {
        return monday;
    }

    public void setMonday(String monday) {
        this.monday = monday;
    }

    public String getTuesday() {
        return tuesday;
    }

    public void setTuesday(String tuesday) {
        this.tuesday = tuesday;
    }

    public String getWednesday() {
        return wednesday;
    }

    public void setWednesday(String wednesday) {
        this.wednesday = wednesday;
    }

    public String getThursday() {
        return thursday;
    }

    public void setThursday(String thursday) {
        this.thursday = thursday;
    }

    public String getFriday() {
        return friday;
    }

    public void setFriday(String friday) {
        this.friday = friday;
    }

    public String getSaturday() {
        return saturday;
    }

    public void setSaturday(String saturday) {
        this.saturday = saturday;
    }

    public String getSunday() {
        return sunday;
    }

    public void setSunday(String sunday) {
        this.sunday = sunday;
    }

    
}
