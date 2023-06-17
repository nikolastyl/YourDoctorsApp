package com.example.yourdoctorsapp.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.yourdoctorsapp.Repositories.DoctorRepository;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    @Autowired
    private DoctorRepository doctorRepository;

    @GetMapping("/specialties")
    public List<String> getSpecialties() {
        return doctorRepository.findDistinctSpecialties();
    }

    @GetMapping("/areas")
    public List<String> getAreas() {
        return doctorRepository.findDistinctAreas();
    }
    
}
