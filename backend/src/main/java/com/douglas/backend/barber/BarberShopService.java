package com.douglas.backend.barber;

import com.douglas.backend.barber.dto.BarberShopRequestDTO;
import com.douglas.backend.barber.dto.BarberShopResponseDTO;
import com.douglas.backend.geocoding.GeocodingService;
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
    private final GeocodingService geocodingService;


    public BarberShopResponseDTO createMyBarberShop(BarberShopRequestDTO dto) {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        UserEntity owner = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found..."));

        var coords = geocodingService.findCoordinates(dto.getAddress());
        System.out.println("COORDENADAS ENCONTRADAS: " + coords);

        BarberShopEntity barberShop = BarberShopEntity.builder()
                .name(dto.getName())
                .address(dto.getAddress())
                .phone(dto.getPhone())
                .openDays(dto.getOpenDays())
                .openHour(dto.getOpenHour())
                .closeHour(dto.getCloseHour())
                .latitude(coords != null ? coords.lat() : null)
                .longitude(coords != null ? coords.lng() : null)
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
        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        UserEntity owner = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return barberShopRepository.findByOwnerId(owner.getId())
                .map(shop -> new BarberShopResponseDTO(
                        shop.getId(),
                        shop.getName(),
                        shop.getAddress(),
                        shop.getPhone(),
                        shop.getOpenDays(),
                        shop.getOpenHour(),
                        shop.getCloseHour(),
                        shop.getLatitude(),
                        shop.getLongitude()
                ))
                .orElse(null);
    }

    public BarberShopResponseDTO updateMyShop(Long id, BarberShopRequestDTO barberShop) {
        BarberShopEntity barberShopEntity = barberShopRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Barbershop not found"));

        if (!barberShopEntity.getAddress().equalsIgnoreCase(barberShop.getAddress())) {
            var coords = geocodingService.findCoordinates(barberShop.getAddress());
            if (coords != null) {
                barberShopEntity.setLatitude(coords.lat());
                barberShopEntity.setLongitude(coords.lng());
            }
        }

        barberShopEntity.setName(barberShop.getName());
        barberShopEntity.setAddress(barberShop.getAddress());
        barberShopEntity.setPhone(barberShop.getPhone());
        barberShopEntity.setOpenDays(barberShop.getOpenDays());
        barberShopEntity.setOpenHour(barberShop.getOpenHour());
        barberShopEntity.setCloseHour(barberShop.getCloseHour());

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
