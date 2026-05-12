package com.douglas.backend.barber;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BarberShopRepository extends JpaRepository<BarberShopEntity, Long> {
    Optional<BarberShopEntity> findByOwnerId(Long ownerId);
}

