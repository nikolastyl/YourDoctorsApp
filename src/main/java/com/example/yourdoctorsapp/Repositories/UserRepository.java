package com.example.yourdoctorsapp.Repositories;

import java.math.BigDecimal;

import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.repository.CrudRepository;

import com.example.yourdoctorsapp.Patients;



public interface UserRepository extends JpaRepository<Patients,BigDecimal> {
    

}
