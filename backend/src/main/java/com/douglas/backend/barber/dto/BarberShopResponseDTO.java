package com.douglas.backend.barber.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BarberShopResponseDTO {
    private Long id;
    private String name;
    private String address;
    private String phone;
    private String openDays;
    private String openHour;
    private String closeHour;
    private Double latitude;
    private Double longitude;
}
