package com.example.yourdoctorsapp;


import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    public UserRepository userRepository;

    @PostMapping("/login")
    public String loginUser(@RequestBody Patients patient) {
        System.out.println(patient.getAmka());
        Patients existingPatient = userRepository.findById(patient.getAmka()).orElse(null);
        System.out.println(existingPatient);
        if (existingPatient == null) {
            return "User not found";
        } else {
            if (existingPatient.getPassword().equals(patient.getPassword())) {
                return "Successful Log in";
            } else {
                return "Invalid password";
            }
        }
    }

    @PostMapping("/register")
    public void createUser(@RequestBody Patients patient) {
        //Patients existingPatient = userRepository.findById(patient.getAmka()).orElse(null);
        System.out.println(patient.getAmka());
            userRepository.save(patient);
    }

    @GetMapping("/{amka}")
public ResponseEntity<?> getUserByAmka(@PathVariable BigDecimal amka) {
    Patients patient = userRepository.findById(amka).orElse(null);
    if (patient != null) {
        return ResponseEntity.ok().body("{\"exists\": true}");
    } else {
        return ResponseEntity.ok().body("{\"exists\": false}");
    }
}


    

    
}
