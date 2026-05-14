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

    // CLIENTE CRIA AGENDAMENTO
    @PostMapping
    public ResponseEntity<AppointmentResponseDTO> create(
            @RequestBody AppointmentRequestDTO appointment
    ) {

        AppointmentResponseDTO created = service.create(appointment);

        return ResponseEntity.ok(created);
    }

    // BARBEIRO LISTA PENDENTES
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

    // BARBEIRO LISTA CONFIRMADOS
    @GetMapping("/confirmed/{shopId}")
    public ResponseEntity<List<AppointmentResponseDTO>> getConfirmedAppointments(
            @PathVariable Long shopId
    ) {

        return ResponseEntity.ok(
                service.getConfirmedAppointments(shopId)
        );
    }

    // BARBEIRO APROVA
    @PutMapping("/{appointmentId}/approve")
    public ResponseEntity<AppointmentResponseDTO> approve(
            @PathVariable Long appointmentId
    ) {

        return ResponseEntity.ok(
                service.approve(appointmentId)
        );
    }

    // BARBEIRO REJEITA
    @PutMapping("/{appointmentId}/reject")
    public ResponseEntity<AppointmentResponseDTO> reject(
            @PathVariable Long appointmentId
    ) {

        return ResponseEntity.ok(
                service.reject(appointmentId)
        );
    }

    // CLIENTE LISTA PRÓPRIOS AGENDAMENTOS
    @GetMapping("/my")
    public ResponseEntity<List<AppointmentResponseDTO>> myAppointments() {

        return ResponseEntity.ok(
                service.getMyAppointments()
        );
    }
}
