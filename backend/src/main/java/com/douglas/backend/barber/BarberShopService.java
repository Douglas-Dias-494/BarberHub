package com.douglas.backend.barber;

import com.douglas.backend.barber.dto.BarberShopRequestDTO;
import com.douglas.backend.barber.dto.BarberShopResponseDTO;
import com.douglas.backend.user.UserEntity;
import com.douglas.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BarberShopService {

    private final BarberShopRepository barberShopRepository;
    private final UserRepository userRepository;

    public BarberShopResponseDTO createMyBarberShop(BarberShopRequestDTO dto) {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        UserEntity owner = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found..."));

        BarberShopEntity barberShop = BarberShopEntity.builder()
                .name(dto.getName())
                .address(dto.getAddress())
                .phone(dto.getPhone())
                .openDays(dto.getOpenDays())
                .openHour(dto.getOpenHour())
                .closeHour(dto.getCloseHour())
                .latitude(dto.getLatitude())
                .longitude(dto.getLongitude())
                .owner(owner)
                .build();

        BarberShopEntity savedBarberShop = barberShopRepository.save(barberShop);

        return new BarberShopResponseDTO(
                savedBarberShop.getId(),
                savedBarberShop.getName(),
                savedBarberShop.getAddress(),
                savedBarberShop.getPhone(),
                savedBarberShop.getOpenDays(),
                savedBarberShop.getOpenHour(),
                savedBarberShop.getCloseHour(),
                savedBarberShop.getLatitude(),
                savedBarberShop.getLongitude()
        );
    }

    public BarberShopResponseDTO getMyShop() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        UserEntity owner = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        BarberShopEntity shop = barberShopRepository.findByOwnerId(owner.getId())
                .orElseThrow(() -> new RuntimeException("Shop not found"));

        return new BarberShopResponseDTO(
                shop.getId(),
                shop.getName(),
                shop.getAddress(),
                shop.getPhone(),
                shop.getOpenDays(),
                shop.getOpenHour(),
                shop.getCloseHour(),
                shop.getLatitude(),
                shop.getLongitude()
        );
    }

}
