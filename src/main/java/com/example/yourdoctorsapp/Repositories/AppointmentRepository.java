package com.example.yourdoctorsapp.Repositories;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.yourdoctorsapp.Appointments;

public interface AppointmentRepository extends JpaRepository<Appointments, Long>{

    @Query("SELECT a FROM Appointments a WHERE a.amka_doctor= :amka_doctor")
    List<Appointments> findAppointments(@Param("amka_doctor") BigDecimal amka_doctor);
    

    @Query("SELECT a FROM Appointments a WHERE a.amka_patient= :patient_amka")
    List<Appointments> findPatientAppointments(@Param("patient_amka") BigDecimal patient_amka);
    
}
