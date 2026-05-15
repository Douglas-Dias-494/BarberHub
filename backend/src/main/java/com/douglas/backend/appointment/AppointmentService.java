package com.douglas.backend.appointment;

import com.douglas.backend.appointment.dto.AppointmentRequestDTO;
import com.douglas.backend.appointment.dto.AppointmentResponseDTO;
import com.douglas.backend.barber.BarberServiceEntity;
import com.douglas.backend.barber.BarberServiceRepository;
import com.douglas.backend.barber.BarberShopEntity;
import com.douglas.backend.barber.BarberShopRepository;
import com.douglas.backend.enums.AppointmentStatus;
import com.douglas.backend.user.UserEntity;
import com.douglas.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository repository;
    private final SimpMessagingTemplate messagingTemplate;
    private final UserRepository userRepository;
    private final BarberShopRepository barberShopRepository;
    private final BarberServiceRepository barberServiceRepository;

    public AppointmentResponseDTO create(
          AppointmentRequestDTO dto
    ) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        UserEntity client = userRepository.findByEmail(email)
                .orElseThrow();

        BarberShopEntity barberShop = barberShopRepository
                .findById(dto.barberShopId())
                .orElseThrow();

        BarberServiceEntity service = barberServiceRepository
                .findById(dto.serviceId())
                .orElseThrow();

        AppointmentEntity appointment = AppointmentEntity.builder()
                .client(client)
                .barberShop(barberShop)
                .service(service)
                .appointmentDate(dto.appointmentDate())
                .appointmentHour(dto.appointmentHour())
                .notes(dto.notes())
                .totalPrice(service.getPrice())
                .status(AppointmentStatus.PENDING)
                .build();

        AppointmentEntity saved = repository.save(appointment);

        Map<String, Object> payload = new HashMap<>();

        payload.put("id", saved.getId());
        payload.put("client", saved.getClient().getName());
        payload.put("service", saved.getService().getName());
        payload.put("hour", saved.getAppointmentHour());
        payload.put("price", saved.getTotalPrice());
        payload.put("status", saved.getStatus());

        messagingTemplate.convertAndSend(
                "/topic/barber/" + saved.getBarberShop().getOwner().getId(),
                Optional.of(payload)
        );

        return mapToResponse(saved);
    }

    private AppointmentResponseDTO mapToResponse(
            AppointmentEntity appointment
    ) {

        return new AppointmentResponseDTO(

                appointment.getId(),

                appointment.getClient().getName(),

                appointment.getBarberShop().getName(),

                appointment.getService().getName(),

                appointment.getAppointmentDate(),

                appointment.getAppointmentHour(),

                appointment.getTotalPrice(),

                appointment.getStatus(),

                appointment.getNotes()
        );
    }

    public AppointmentResponseDTO approve(Long appointmentId) {

        AppointmentEntity appointment = repository.findById(appointmentId)
                .orElseThrow();

        appointment.setStatus(AppointmentStatus.CONFIRMED);

        AppointmentEntity saved = repository.save(appointment);

        return mapToResponse(saved);
    }

    public AppointmentResponseDTO reject(Long appointmentId) {

        AppointmentEntity appointment = repository.findById(appointmentId)
                .orElseThrow();

        appointment.setStatus(AppointmentStatus.REJECTED);

        AppointmentEntity saved = repository.save(appointment);

        return mapToResponse(saved);
    }

    public List<AppointmentResponseDTO> getPendingAppointments(Long barberShopId) {

        return repository.findByBarberShopIdAndStatus(
                barberShopId,
                AppointmentStatus.PENDING
        );
    }

    public List<AppointmentResponseDTO> getConfirmedAppointments(Long barberShopId) {

        return repository.findByBarberShopIdAndStatus(
                barberShopId,
                AppointmentStatus.CONFIRMED
        );
    }

    public List<AppointmentResponseDTO> getMyAppointments() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return repository.findByClientEmail(email);
    }

    List<AppointmentResponseDTO> findAllById(Long shopId) {
        return repository.findByBarberShopId(shopId);
    }
}
