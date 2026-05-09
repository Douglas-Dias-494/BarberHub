package com.douglas.backend.appointment;

import com.douglas.backend.barber.BarberServiceEntity;
import com.douglas.backend.barber.BarberShopEntity;
import com.douglas.backend.user.UserEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppointmentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private UserEntity client;

    @ManyToOne
    private BarberShopEntity barberShop;

    @ManyToOne
    private BarberServiceEntity service;

    private LocalDate appointmentDate;

    private LocalTime appointmentHour;

    private Double totalPrice;
}
