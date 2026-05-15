package com.douglas.backend.barber;

import com.douglas.backend.barber.dto.BarberServiceRequestDTO;
import com.douglas.backend.barber.dto.BarberServiceResponseDTO;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BarberServiceServiceTest {

    @Mock
    private BarberServiceRepository barberServiceRepository;

    @Mock
    private BarberShopRepository barberShopRepository;

    @InjectMocks
    private BarberServiceService service;

    @Test
    @DisplayName("Should create service successfully")
    void shouldCreateServiceSuccessfully() {

        BarberShopEntity shop = BarberShopEntity.builder()
                .id(1L)
                .name("Barbearia Douglas")
                .build();

        BarberServiceRequestDTO request =
                new BarberServiceRequestDTO(
                        "Corte",
                        35.00,
                        45
                );

        BarberServiceEntity entity = BarberServiceEntity.builder()
                .id(1L)
                .name("Corte")
                .price(35.00)
                .duration(45)
                .barberShopEntity(shop)
                .build();

        when(barberShopRepository.findById(1L))
                .thenReturn(Optional.of(shop));

        when(barberServiceRepository.save(any(BarberServiceEntity.class)))
                .thenReturn(entity);

        BarberServiceResponseDTO response =
                service.createService(1L, request);

        assertNotNull(response);
        assertEquals("Corte", response.name());
        assertEquals(35, response.price());
        assertEquals(45, response.duration());

        verify(barberShopRepository, times(1))
                .findById(1L);

        verify(barberServiceRepository, times(1))
                .save(any(BarberServiceEntity.class));
    }

    @Test
    @DisplayName("Should throw exception when barbershop is not found")
    void shouldThrowExceptionWhenBarbershopIsNotFound() {

        BarberServiceRequestDTO request =
                new BarberServiceRequestDTO(
                        "Corte",
                        35.00,
                        45
                );

        when(barberShopRepository.findById(1L))
                .thenReturn(Optional.empty());

        ResponseStatusException exception = assertThrows(
                ResponseStatusException.class,
                () -> service.createService(1L, request)
        );

        assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
        assertEquals(
                "404 NOT_FOUND \"Barbershop not found\"",
                exception.getMessage()
        );

        verify(barberServiceRepository, never())
                .save(any());
    }

    @Test
    @DisplayName("Should return all services by shop id")
    void shouldReturnAllServicesByShopId() {

        BarberShopEntity shop = BarberShopEntity.builder()
                .id(1L)
                .name("Barbearia Douglas")
                .build();

        BarberServiceEntity service1 = BarberServiceEntity.builder()
                .id(1L)
                .name("Corte")
                .price(35.00)
                .duration(45)
                .barberShopEntity(shop)
                .build();

        BarberServiceEntity service2 = BarberServiceEntity.builder()
                .id(2L)
                .name("Barba")
                .price(20.00)
                .duration(30)
                .barberShopEntity(shop)
                .build();

        when(barberServiceRepository.findByShopId(1L))
                .thenReturn(List.of(service1, service2));

        List<BarberServiceResponseDTO> response =
                service.findAllServicesByShopId(1L);

        assertNotNull(response);
        assertEquals(2, response.size());

        assertEquals("Corte", response.get(0).name());
        assertEquals("Barba", response.get(1).name());

        verify(barberServiceRepository, times(1))
                .findByShopId(1L);
    }

    @Test
    @DisplayName("Should update service successfully")
    void shouldUpdateServiceSuccessfully() {

        BarberShopEntity shop = BarberShopEntity.builder()
                .id(1L)
                .build();

        BarberServiceEntity entity = BarberServiceEntity.builder()
                .id(1L)
                .name("Corte")
                .price(35.00)
                .duration(45)
                .barberShopEntity(shop)
                .build();

        BarberServiceRequestDTO request =
                new BarberServiceRequestDTO(
                        "Corte Premium",
                        50.00,
                        60
                );

        when(barberServiceRepository.findByIdAndShopId(1L, 1L))
                .thenReturn(Optional.of(entity));

        when(barberServiceRepository.save(any(BarberServiceEntity.class)))
                .thenReturn(entity);

        BarberServiceResponseDTO response =
                service.updateService(1L, 1L, request);

        assertNotNull(response);

        verify(barberServiceRepository, times(1))
                .findByIdAndShopId(1L, 1L);

        verify(barberServiceRepository, times(1))
                .save(any(BarberServiceEntity.class));
    }

    @Test
    @DisplayName("Should throw exception when service is not found during update")
    void shouldThrowExceptionWhenServiceIsNotFoundDuringUpdate() {

        BarberServiceRequestDTO request =
                new BarberServiceRequestDTO(
                        "Corte",
                        35.00,
                        45
                );

        when(barberServiceRepository.findByIdAndShopId(1L, 1L))
                .thenReturn(Optional.empty());

        ResponseStatusException exception = assertThrows(
                ResponseStatusException.class,
                () -> service.updateService(1L, 1L, request)
        );

        assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
        assertEquals(
                "404 NOT_FOUND \"Service not found for this shop\"",
                exception.getMessage()
        );

        verify(barberServiceRepository, never())
                .save(any());
    }

    @Test
    @DisplayName("Should delete service successfully")
    void shouldDeleteServiceSuccessfully() {

        BarberShopEntity shop = BarberShopEntity.builder()
                .id(1L)
                .build();

        BarberServiceEntity entity = BarberServiceEntity.builder()
                .id(1L)
                .name("Corte")
                .barberShopEntity(shop)
                .build();

        when(barberServiceRepository.findByIdAndShopId(1L, 1L))
                .thenReturn(Optional.of(entity));

        service.deleteService(1L, 1L);

        verify(barberServiceRepository, times(1))
                .delete(entity);
    }

    @Test
    @DisplayName("Should throw exception when service is not found during delete")
    void shouldThrowExceptionWhenServiceIsNotFoundDuringDelete() {

        when(barberServiceRepository.findByIdAndShopId(1L, 1L))
                .thenReturn(Optional.empty());

        ResponseStatusException exception = assertThrows(
                ResponseStatusException.class,
                () -> service.deleteService(1L, 1L)
        );

        assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
        assertEquals(
                "404 NOT_FOUND \"Service not found\"",
                exception.getMessage()
        );

        verify(barberServiceRepository, never())
                .delete(any());
    }
}