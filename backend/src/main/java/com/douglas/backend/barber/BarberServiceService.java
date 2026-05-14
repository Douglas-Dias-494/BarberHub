package com.douglas.backend.barber;

import com.douglas.backend.barber.dto.BarberServiceRequestDTO;
import com.douglas.backend.barber.dto.BarberServiceResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BarberServiceService {
    private final BarberServiceRepository barberServiceRepository;
    private final BarberShopRepository barberShopRepository;


    public BarberServiceResponseDTO createService(Long shopId, BarberServiceRequestDTO request) {

        BarberShopEntity barberShopEntity = barberShopRepository.findById(shopId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Barbershop not found"));

        BarberServiceEntity barberServiceEntity = BarberServiceEntity.builder()
                .name(request.name())
                .price(request.price())
                .duration(request.duration())
                .barberShopEntity(barberShopEntity)
                .build();

        BarberServiceEntity savedBarberServiceEntity = barberServiceRepository.save(barberServiceEntity);

        return BarberServiceResponseDTO.fromEntity(savedBarberServiceEntity);

    }

    public List<BarberServiceResponseDTO> findAllServicesByShopId(Long shopId) {
        return barberServiceRepository.findByShopId(shopId)
                .stream()
                .map(BarberServiceResponseDTO::fromEntity)
                .toList();
    }

    public BarberServiceResponseDTO updateService(Long shopId, Long id, BarberServiceRequestDTO request) {

        BarberServiceEntity barberServiceEntity = barberServiceRepository.findByIdAndShopId(id, shopId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Service not found for this shop"));

        barberServiceEntity.setName(request.name());
        barberServiceEntity.setPrice(request.price());
        barberServiceEntity.setDuration(request.duration());

        BarberServiceEntity updatedService = barberServiceRepository.save(barberServiceEntity);
        return BarberServiceResponseDTO.fromEntity(updatedService);
    }

    public void deleteService(Long shopId, Long id) {
        BarberServiceEntity entity = barberServiceRepository.findByIdAndShopId(id, shopId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Service not found"));
        barberServiceRepository.delete(entity);

    }

}
