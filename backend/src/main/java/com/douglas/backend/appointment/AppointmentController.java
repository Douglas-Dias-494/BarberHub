package com.douglas.backend.appointment;

import com.douglas.backend.appointment.dto.AppointmentRequestDTO;
import com.douglas.backend.appointment.dto.AppointmentResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService service;

    @PostMapping
    public ResponseEntity<AppointmentResponseDTO> create(
            @RequestBody AppointmentRequestDTO appointment
    ) {

        AppointmentResponseDTO created = service.create(appointment);

        return ResponseEntity.ok(created);
    }

    @GetMapping("/pending/{shopId}")
    public ResponseEntity<List<AppointmentResponseDTO>> getPendingAppointments(
            @PathVariable Long shopId
    ) {

        return ResponseEntity.ok(
                service.getPendingAppointments(shopId)
        );
    }

    @GetMapping("/{shopId}")
    public ResponseEntity<List<AppointmentResponseDTO>> getAppointments(
            @PathVariable Long shopId
    ) {

        return ResponseEntity.ok(
                service.findAllById(shopId)
        );
    }

    @GetMapping("/confirmed/{shopId}")
    public ResponseEntity<List<AppointmentResponseDTO>> getConfirmedAppointments(
            @PathVariable Long shopId
    ) {

        return ResponseEntity.ok(
                service.getConfirmedAppointments(shopId)
        );
    }

    @PutMapping("/{appointmentId}/approve")
    public ResponseEntity<AppointmentResponseDTO> approve(
            @PathVariable Long appointmentId
    ) {

        return ResponseEntity.ok(
                service.approve(appointmentId)
        );
    }

    @PutMapping("/{appointmentId}/reject")
    public ResponseEntity<AppointmentResponseDTO> reject(
            @PathVariable Long appointmentId
    ) {

        return ResponseEntity.ok(
                service.reject(appointmentId)
        );
    }

    @GetMapping("/my")
    public ResponseEntity<List<AppointmentResponseDTO>> myAppointments() {

        return ResponseEntity.ok(
                service.getMyAppointments()
        );
    }
}
