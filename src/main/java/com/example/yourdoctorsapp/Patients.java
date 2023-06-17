package com.example.yourdoctorsapp;


import java.math.BigDecimal;

import jakarta.persistence.*;

@Entity
@Table(name = "patients")
public class Patients {

    @Column(name="amka")
    @Id
    private BigDecimal amka;


    @Column(name="password")
    private String password;


    public BigDecimal getAmka() {
        return amka;
    }

    public void setAmka(BigDecimal amka) {
        this.amka = amka;
    }

    public String getPassword() {return password;}

    public void setPassword(String password) {this.password = password;}

    public Patients() {        
    }


}
