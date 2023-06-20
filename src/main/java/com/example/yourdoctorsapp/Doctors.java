package com.example.yourdoctorsapp;

import java.math.BigDecimal;

import jakarta.persistence.*;

@Entity
@Table(name = "doctors")
public class Doctors {

    @Column(name="amka")
    @Id
    private BigDecimal amka;

    @Column(name="first_name")
    private String first_name;

    @Column(name="last_name")
    private String last_name;

    @Column(name="specialty")
    private String specialty;

    @Column(name="phone")
    private Long phone;

    @Column(name="email")
    private String email;

    @Column(name="location")
    private String location;

    @Column(name="address")
    private String address;


    public Doctors() {
    }

    
    public Doctors(BigDecimal amka, String first_name, String last_name, String specialty, Long phone, String email,
            String location, String address) {
        this.amka = amka;
        this.first_name = first_name;
        this.last_name = last_name;
        this.specialty = specialty;
        this.phone = phone;
        this.email = email;
        this.location = location;
        this.address = address;
    }


    public BigDecimal getAmka() {
        return amka;
    }

    public void setAmka(BigDecimal amka) {
        this.amka = amka;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getSpecialty() {
        return specialty;
    }

    public void setSpecialty(String specialty) {
        this.specialty = specialty;
    }

    public Long getPhone() {
        return phone;
    }

    public void setPhone(Long phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }


    
}
