package com.douglas.backend.appointment.dto;

import com.douglas.backend.enums.AppointmentStatus;

import java.time.LocalDate;
import java.time.LocalTime;

public record AppointmentResponseDTO(
        Long id,

        String clientName,

        String barberShopName,

        String serviceName,

        LocalDate appointmentDate,

        LocalTime appointmentHour,

        Double totalPrice,

        AppointmentStatus status,

        String notes
) {
}
