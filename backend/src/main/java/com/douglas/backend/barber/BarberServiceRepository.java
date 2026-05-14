package com.douglas.backend.barber;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BarberServiceRepository extends JpaRepository<BarberServiceEntity, Long> {

    @Query("SELECT b FROM BarberServiceEntity b WHERE b.barberShopEntity.id = :shopId")
    List<BarberServiceEntity> findByShopId(@Param("shopId") Long shopId);

    @Query("SELECT b FROM BarberServiceEntity b WHERE b.id = :id AND b.barberShopEntity.id = :shopId")
    Optional<BarberServiceEntity> findByIdAndShopId(@Param("id") Long id, @Param("shopId") Long shopId);
}
