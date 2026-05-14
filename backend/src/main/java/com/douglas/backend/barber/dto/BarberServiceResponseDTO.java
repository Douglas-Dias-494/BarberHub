package com.douglas.backend.barber.dto;

import com.douglas.backend.barber.BarberServiceEntity;

public record BarberServiceResponseDTO(

        Long id,

         String name,

         Double price,

         Integer duration,

         String barberShopEntityName
) {
    public static BarberServiceResponseDTO fromEntity(BarberServiceEntity entity) {
        return new BarberServiceResponseDTO(
                entity.getId(),
                entity.getName(),
                entity.getPrice(),
                entity.getDuration(),
                entity.getBarberShopEntity().getName()
        );
    }
}
