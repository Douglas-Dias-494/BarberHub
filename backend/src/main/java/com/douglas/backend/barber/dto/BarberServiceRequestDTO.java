package com.douglas.backend.barber.dto;

import com.douglas.backend.barber.BarberServiceEntity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


public record BarberServiceRequestDTO(

        @NotBlank(message = "this field cannot be blank")
        String name,

        @NotNull(message = "this field cannot be null")
        Double price,

        @NotNull(message = "this field cannot be null")
        Integer duration
) {
    public BarberServiceEntity toEntity() {
        return BarberServiceEntity.builder()
                .name(this.name)
                .price(this.price)
                .duration(this.duration)
                .build();
    }
}
