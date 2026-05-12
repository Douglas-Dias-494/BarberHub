package com.douglas.backend.barber;

import com.douglas.backend.barber.dto.BarberShopRequestDTO;
import com.douglas.backend.barber.dto.BarberShopResponseDTO;
import com.douglas.backend.user.UserEntity;
import com.douglas.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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

    public BarberShopResponseDTO updateMyShop(Long id, BarberShopRequestDTO barberShop) {
        BarberShopEntity barberShopEntity = barberShopRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Barbershop not found"));

        barberShopEntity.setName(barberShop.getName());
        barberShopEntity.setAddress(barberShop.getAddress());
        barberShopEntity.setPhone(barberShop.getPhone());
        barberShopEntity.setOpenDays(barberShop.getOpenDays());
        barberShopEntity.setOpenHour(barberShop.getOpenHour());
        barberShopEntity.setCloseHour(barberShop.getCloseHour());
        barberShopEntity.setLatitude(barberShop.getLatitude());
        barberShopEntity.setLongitude(barberShop.getLongitude());

        BarberShopEntity updatedBarberShop = barberShopRepository.save(barberShopEntity);

        return new BarberShopResponseDTO(
                updatedBarberShop.getId(),
                updatedBarberShop.getName(),
                updatedBarberShop.getAddress(),
                updatedBarberShop.getPhone(),
                updatedBarberShop.getOpenDays(),
                updatedBarberShop.getOpenHour(),
                updatedBarberShop.getCloseHour(),
                updatedBarberShop.getLatitude(),
                updatedBarberShop.getLongitude()
        );
    }

    public void deleteMyShop(Long id) {
        BarberShopEntity barberShopEntity = barberShopRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "BarberShop not found"));

        barberShopRepository.delete(barberShopEntity);
    }

}
