package com.example.yourdoctorsapp.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
//import org.springframework.stereotype.Repository;

import com.example.yourdoctorsapp.Doctors;

import java.math.BigDecimal;
import java.util.List;


public interface DoctorRepository extends JpaRepository<Doctors, BigDecimal> {

    @Query("SELECT DISTINCT d.specialty FROM Doctors d")
    List<String> findDistinctSpecialties();

@   Query("SELECT DISTINCT d.location FROM Doctors d")
    List<String> findDistinctAreas();

}
