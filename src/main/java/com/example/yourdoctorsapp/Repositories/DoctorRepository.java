package com.example.yourdoctorsapp.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
//import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import com.example.yourdoctorsapp.Doctors;

import java.math.BigDecimal;
import java.util.List;


public interface DoctorRepository extends JpaRepository<Doctors, BigDecimal> {

    @Query("SELECT DISTINCT d.specialty FROM Doctors d")
    List<String> findDistinctSpecialties();

    @Query("SELECT DISTINCT d.location FROM Doctors d WHERE d.specialty = :specialty")
    List<String> findDistinctAreasBySpecialty(@Param("specialty") String specialty);

    @Query("SELECT DISTINCT CONCAT(d.first_name, ' ', d.last_name) AS fullName FROM Doctors d WHERE d.specialty = :specialty AND d.location = :area")
    List<String> findTheDoctors(@Param("specialty") String specialty, @Param("area") String area);

    @Query("SELECT d FROM Doctors d WHERE d.specialty = :specialty AND d.location = :area")
    List<Doctors> findFullDoctors(@Param("specialty") String specialty, @Param("area") String area);





}
