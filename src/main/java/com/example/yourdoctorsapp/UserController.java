package com.example.yourdoctorsapp;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public void createUser(@RequestBody Patients patient) {
        System.out.println("1o bhma check");
        System.out.println(patient.getAmka());
        System.out.println(patient.getPassword());
        userRepository.save(patient);




    }
}
