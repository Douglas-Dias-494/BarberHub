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

import java.time.LocalTime;
import java.time.ZoneId;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BarberShopService {

    private final BarberShopRepository barberShopRepository;
    private final UserRepository userRepository;
    private final GeocodingService geocodingService;


    private boolean checkIfOpen(String open, String close) {
        try {
            if (open == null || close == null) return false;

            ZoneId zoneId = ZoneId.of("America/Sao_Paulo");
            LocalTime now = LocalTime.now(zoneId);

            LocalTime opening = LocalTime.parse(open);
            LocalTime closing = LocalTime.parse(close);

            System.out.println("DEBUG Horário calculado: " + now);

            return !now.isBefore(opening) && !now.isAfter(closing);
        } catch (Exception e) {
            return false;
        }
    }

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
        return toDTO(savedBarberShop, null, null);
    }

    public BarberShopResponseDTO getMyShop() {
        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        UserEntity owner = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return barberShopRepository.findByOwnerId(owner.getId())
                .map(shop -> toDTO(shop, null, null))
                .orElse(null);
    }

    public List<BarberShopResponseDTO> findAllAndSortByDistance(Double userLat, Double userLon) {
        List<BarberShopEntity> shops = barberShopRepository.findAll();

        return shops.stream()
                // Aqui passamos a entidade e as coordenadas do usuário para o toDTO
                .map(shop -> toDTO(shop, userLat, userLon))
                // Ordenamos usando o campo distance que o toDTO já calculou
                .sorted(Comparator.comparingDouble(dto ->
                        dto.getDistance() != null ? dto.getDistance() : Double.MAX_VALUE))
                .toList();
    }

    private double calculateDistance(double lat1, double lon1, Double lat2, Double lon2) {
        if (lat2 == null || lon2 == null) return Double.MAX_VALUE;

        double earthRadius = 6371;
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
                        Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return earthRadius * c;
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
        return toDTO(updatedBarberShop, null, null);
    }

    public void deleteMyShop(Long id) {
        BarberShopEntity barberShopEntity = barberShopRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "BarberShop not found"));

        barberShopRepository.delete(barberShopEntity);
    }


    private BarberShopResponseDTO toDTO(BarberShopEntity entity, Double userLat, Double userLon) {
        Double dist = null;
        System.out.println("DEBUG DISTANCIA - UserLat: " + userLat + " | UserLon: " + userLon);

        if (userLat != null && userLon != null) {
            dist = calculateDistance(userLat, userLon, entity.getLatitude(), entity.getLongitude());
            System.out.println("DEBUG DISTANCIA - Calculado para " + entity.getName() + ": " + dist);
        } else {
            System.out.println("DEBUG DISTANCIA - Não calculado: Coordenadas do usuário nulas.");
        }

        boolean openNow = checkIfOpen(entity.getOpenHour(), entity.getCloseHour());

        return new BarberShopResponseDTO(
                entity.getId(),
                entity.getName(),
                entity.getAddress(),
                entity.getPhone(),
                entity.getOpenDays(),
                entity.getOpenHour(),
                entity.getCloseHour(),
                entity.getLatitude(),
                entity.getLongitude(),
                dist,
                openNow
        );
    }

}
