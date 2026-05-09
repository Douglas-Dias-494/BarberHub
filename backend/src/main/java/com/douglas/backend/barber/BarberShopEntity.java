package com.douglas.backend.barber;

import com.douglas.backend.user.UserEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BarberShopEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String address;

    private String phone;

    private String openDays;

    private String openHour;

    private String closeHour;

    private Double latitude;

    private Double longitude;

    @ManyToOne
    private UserEntity owner;
}