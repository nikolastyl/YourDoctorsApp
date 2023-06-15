package com.example.yourdoctorsapp;


import jakarta.persistence.Entity;
import org.springframework.data.annotation.Id;

@Entity
public class Patients {

    @jakarta.persistence.Id
    @Id
    private Long amka;
    private String password;

    public Long getAmka() {
        return amka;
    }

    public void setAmka(Long amka) {
        this.amka = amka;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {this.password = password;}

}
