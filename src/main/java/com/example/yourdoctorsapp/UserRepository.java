package com.example.yourdoctorsapp;

import org.springframework.data.jpa.repository.JpaRepository;



public interface UserRepository extends JpaRepository<Patients,Long > {

}
