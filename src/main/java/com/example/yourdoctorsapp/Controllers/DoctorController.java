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

    @GetMapping("/shedule")
    public List<String[]> getShedule(@RequestParam("amka") String amka) {
        BigDecimal amka2 = new BigDecimal(amka);
        List<String> firstShedule = new ArrayList<>();
        firstShedule=doctorRepository.findShedule(amka2);
        String days=firstShedule.get(0);
        String[] parts=days.split(",");
        System.out.println(parts.length);
        String[] mon,tus,wed,thur,fri,sut,sun;
        List<String[]> bigListWithListsOfDays = new ArrayList();

        if(parts.length==7){
        mon=parts[0].split("_");
        tus=parts[1].split("_");
        wed=parts[2].split("_");
        thur=parts[3].split("_");
        fri=parts[4].split("_");
        sut=parts[5].split("_");
        sun=parts[6].split("_");

        bigListWithListsOfDays.add(mon);
        bigListWithListsOfDays.add(tus);
        bigListWithListsOfDays.add(wed);
        bigListWithListsOfDays.add(thur);
        bigListWithListsOfDays.add(fri);
        bigListWithListsOfDays.add(sut);
        bigListWithListsOfDays.add(sun);

        return bigListWithListsOfDays;

        }


        
        

        
        return null;
    }

}
