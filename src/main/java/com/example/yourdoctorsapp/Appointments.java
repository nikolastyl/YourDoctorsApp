package com.example.yourdoctorsapp;

import java.math.BigDecimal;
import java.sql.Timestamp;

import jakarta.persistence.*;

@Entity
@Table(name = "appointments")
public class Appointments {

    @Column(name="id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="amka_patient")
    private BigDecimal amka_patient;

    @Column(name="amka_doctor")
    private BigDecimal amka_doctor;

    @Column(name="appointment_start")
    private Timestamp appointment_start;

    @Column(name="appointment_end")
    private Timestamp appointment_end;


    

    public Appointments() {
    }



    public Appointments(Long id, BigDecimal amka_patient, BigDecimal amka_doctor, Timestamp appointment_start,
            Timestamp appointment_end) {
        this.id = id;
        this.amka_patient = amka_patient;
        this.amka_doctor = amka_doctor;
        this.appointment_start = appointment_start;
        this.appointment_end = appointment_end;
    }



    public Appointments(BigDecimal amka_patient, BigDecimal amka_doctor, Timestamp appointment_start,Timestamp appointment_end) {
        this.amka_patient = amka_patient;
        this.amka_doctor = amka_doctor;
        this.appointment_start = appointment_start;
        this.appointment_end = appointment_end;

    }
 


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getAmka_patient() {
        return amka_patient;
    }

    public void setAmka_patient(BigDecimal amka_patient) {
        this.amka_patient = amka_patient;
    }

    public BigDecimal getAmka_doctor() {
        return amka_doctor;
    }

    public void setAmka_doctor(BigDecimal amka_doctor) {
        this.amka_doctor = amka_doctor;
    }

    public Timestamp getAppointment_start() {
        return appointment_start;
    }

    public void setAppointment_start(Timestamp appointment_start) {
        this.appointment_start = appointment_start;
    }

    public Timestamp getAppointment_end() {
        return appointment_end;
    }

    public void setAppointment_end(Timestamp appointment_end) {
        this.appointment_end = appointment_end;
    }

    
    
}
