package com.example.yourdoctorsapp;

import java.math.BigDecimal;

import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.repository.CrudRepository;



public interface UserRepository extends JpaRepository<Patients,BigDecimal> {
    

}
