package com.douglas.backend.barber;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/barbershops")
@RequiredArgsConstructor
public class BarberShopController {

    private final BarberShopRepository repository;

    @GetMapping
    public List<BarberShopEntity> findAll() {
        return repository.findAll();
    }

    @PostMapping
    public BarberShopEntity create(@RequestBody BarberShopEntity barberShop) {
        return repository.save(barberShop);
    }
}
