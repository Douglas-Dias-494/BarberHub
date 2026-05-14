package com.douglas.backend.appointment;

import com.douglas.backend.appointment.dto.AppointmentResponseDTO;
import com.douglas.backend.enums.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<AppointmentEntity, Long> {

    List<AppointmentResponseDTO> findByBarberShopIdAndStatus(
            Long shopId,
            AppointmentStatus status
    );

    List<AppointmentResponseDTO> findByBarberShopId(Long barberShopId);

    List<AppointmentResponseDTO> findByClientEmail(String email);

}
