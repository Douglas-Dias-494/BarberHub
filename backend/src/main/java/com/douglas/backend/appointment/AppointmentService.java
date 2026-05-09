package com.douglas.backend.appointment;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository repository;
    private final SimpMessagingTemplate messagingTemplate;

    public AppointmentEntity create(AppointmentEntity appointment) {

        AppointmentEntity saved = repository.save(appointment);

        Map<String, Object> payload = new HashMap<>();

        payload.put("service", saved.getService().getName());
        payload.put("price", saved.getTotalPrice());
        payload.put("hour", saved.getAppointmentHour());
        payload.put("client", saved.getClient().getName());

        messagingTemplate.convertAndSend(
                "/topic/barber/" + saved.getBarberShop().getOwner().getId(),
                Optional.of(payload)
        );

        return saved;
    }
}
