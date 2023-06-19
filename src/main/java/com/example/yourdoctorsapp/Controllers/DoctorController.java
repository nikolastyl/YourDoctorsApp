package com.example.yourdoctorsapp.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

//import com.example.yourdoctorsapp.SelectedOptions;
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
    public List<String> getAreas(@RequestParam("specialty") String specialty) {
        return doctorRepository.findDistinctAreasBySpecialty(specialty);}

    @GetMapping("/docs")
    public List<String> getDoctors(@RequestParam("specialty") String specialty, @RequestParam("area") String area) {
        return doctorRepository.findTheDoctors(specialty, area);
    }


}
