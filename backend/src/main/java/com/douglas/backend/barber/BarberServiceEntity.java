package com.douglas.backend.barber;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BarberServiceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Double price;

    private Integer duration;

    private String description;

    @ManyToOne
    @JoinColumn(name = "barbershop_id", nullable = false)
    private BarberShopEntity barberShopEntity;
}
