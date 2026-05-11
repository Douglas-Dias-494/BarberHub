package com.douglas.backend.barber.dto;

import com.douglas.backend.user.UserEntity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BarberShopRequestDTO {
    private String name;
    private String address;
    private String phone;
    private String openDays;
    private String openHour;
    private String closeHour;
    private Double latitude;
    private Double longitude;

}
