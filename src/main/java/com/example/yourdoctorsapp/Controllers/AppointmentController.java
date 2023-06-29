package com.example.yourdoctorsapp.Controllers;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.yourdoctorsapp.Appointments;
import com.example.yourdoctorsapp.Repositories.AppointmentRepository;

@RestController
@RequestMapping("/api/appointment")
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @PostMapping("/save")
    public ResponseEntity<String> createAppointment(@RequestBody Appointments appointment ) {
        
        System.out.println(appointment.getAppointment_start());
        System.out.println(appointment.getAppointment_start().toLocalDateTime());
        // Καταχώρηση του νέου ραντεβού στη βάση δεδομένων
        appointmentRepository.save(appointment);
        return ResponseEntity.ok("Το ραντεβού δημιουργήθηκε με επιτυχία");
    }

    @GetMapping("/database")
    public List<Appointments> getAppointments(@RequestParam("amka_doctor") String amka_doctor) {
        System.out.println(amka_doctor);
        BigDecimal decimalAmka = new BigDecimal(amka_doctor);
        System.out.println(appointmentRepository.findAppointments(decimalAmka));
        return appointmentRepository.findAppointments(decimalAmka);
    }

    @GetMapping("/patientApps")
    public List<Appointments> getPatientAppointments(@RequestParam("patient_amka") String patient_amka) {
        System.out.println(patient_amka);
        BigDecimal decimalAmka = new BigDecimal(patient_amka);
        System.out.println(appointmentRepository.findPatientAppointments(decimalAmka));
        return appointmentRepository.findPatientAppointments(decimalAmka);
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteAppointment(@RequestBody Appointments deleteApp ) {
        
        appointmentRepository.delete(deleteApp);
        return ResponseEntity.ok("Το ραντεβού δημιουργήθηκε με επιτυχία");
    }
    
}
