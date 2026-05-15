package com.douglas.backend.barber.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
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
    private Double distance;
    private boolean isOpen;

    public BarberShopResponseDTO(Long id, String name, String address, String phone, String openDays, String openHour, String closeHour, Double latitude, Double longitude, Double distance, boolean isOpen) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.openDays = openDays;
        this.openHour = openHour;
        this.closeHour = closeHour;
        this.latitude = latitude;
        this.longitude = longitude;
        this.distance = distance;
        this.isOpen = isOpen;
    }
}
