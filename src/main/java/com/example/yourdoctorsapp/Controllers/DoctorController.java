package com.example.yourdoctorsapp.Controllers;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.yourdoctorsapp.Doctors;
import com.example.yourdoctorsapp.Repositories.DoctorRepository;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    @Autowired
    private DoctorRepository doctorRepository;
    private List<Doctors> fullDoctors;


    @GetMapping("/specialties")
    public List<String> getSpecialties() {
        return doctorRepository.findDistinctSpecialties();
    }
    
    @GetMapping("/areas")
    public List<String> getAreas(@RequestParam("specialty") String specialty) {
        return doctorRepository.findDistinctAreasBySpecialty(specialty);}

    @GetMapping("/docs")
    public List<String> getDoctors(@RequestParam("specialty") String specialty, @RequestParam("area") String area) {
        fullDoctors = doctorRepository.findFullDoctors(specialty, area);
        return doctorRepository.findTheDoctors(specialty, area);
    }

    @GetMapping("/selectedDoc")
    public List<String> getInfos(@RequestParam("doctor") String doctor) {
        String[] parts = doctor.split(" ");
        String firstName = parts[0];
        String lastName = parts[1];
        List<String> infos = new ArrayList();

        for (Doctors doctor2 : fullDoctors) {
            if (doctor2.getLast_name().equals(lastName) && doctor2.getFirst_name().equals(firstName)){
                infos.add(doctor2.getAmka().toString());
                infos.add(doctor2.getPhone().toString());
                infos.add(doctor2.getEmail());
                infos.add(doctor2.getAddress());
                break;

            }
        }

        return infos;
    }

}
