package com.douglas.backend.appointment.dto;

import com.douglas.backend.user.UserEntity;

import java.time.LocalDate;
import java.time.LocalTime;

public record AppointmentRequestDTO(
        Long barberShopId,

        Long serviceId,

        LocalDate appointmentDate,

        LocalTime appointmentHour,

        String notes

) {
}
