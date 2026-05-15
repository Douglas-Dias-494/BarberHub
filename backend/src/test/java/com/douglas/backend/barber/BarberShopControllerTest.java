package com.douglas.backend.barber;

import com.douglas.backend.barber.dto.BarberShopRequestDTO;
import com.douglas.backend.barber.dto.BarberShopResponseDTO;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BarberShopControllerTest {

    @Mock
    private BarberShopService barberShopService;

    @InjectMocks
    private BarberShopController controller;

    @Test
    @DisplayName("Should create barbershop successfully")
    void shouldCreateBarberShopSuccessfully() {

        BarberShopRequestDTO request = new BarberShopRequestDTO();
        request.setName("Barbearia Douglas");
        request.setAddress("Rua A");
        request.setPhone("11999999999");
        request.setOpenDays("Segunda à Sexta");
        request.setOpenHour("08:00");
        request.setCloseHour("18:00");

        BarberShopResponseDTO responseDTO =
                new BarberShopResponseDTO(
                        1L,
                        "Barbearia Douglas",
                        "Rua A",
                        "11999999999",
                        "Segunda à Sexta",
                        "08:00",
                        "18:00",
                        -23.0,
                        -46.0,
                        10.00,
                        true
                );

        when(barberShopService.createMyBarberShop(request))
                .thenReturn(responseDTO);

        BarberShopResponseDTO response = controller.create(request);

        assertNotNull(response);
        assertEquals("Barbearia Douglas", response.getName());

        verify(barberShopService, times(1))
                .createMyBarberShop(request);
    }

    @Test
    @DisplayName("Should return my shop successfully")
    void shouldReturnMyShopSuccessfully() {

        BarberShopResponseDTO responseDTO =
                new BarberShopResponseDTO(
                        1L,
                        "Barbearia Douglas",
                        "Rua A",
                        "11999999999",
                        "Segunda à Sexta",
                        "08:00",
                        "20:00",
                        -23.0,
                        -46.0,
                        10.00,
                        true
                );

        when(barberShopService.getMyShop())
                .thenReturn(responseDTO);

        ResponseEntity<BarberShopResponseDTO> response =
                controller.getMyShop();

        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());
        assertNotNull(response.getBody());

        assertEquals(
                "Barbearia Douglas",
                response.getBody().getName()
        );

        verify(barberShopService, times(1))
                .getMyShop();
    }

    @Test
    @DisplayName("Should update barbershop successfully")
    void shouldUpdateBarberShopSuccessfully() {

        BarberShopRequestDTO request = new BarberShopRequestDTO();
        request.setName("Nova Barbearia");

        BarberShopResponseDTO responseDTO =
                new BarberShopResponseDTO(
                        1L,
                        "Nova Barbearia",
                        "Rua Nova",
                        "11888888888",
                        "Segunda à Sexta",
                        "09:00",
                        "20:00",
                        -22.0,
                        -45.0,
                        10.00,
                        true
                );

        when(barberShopService.updateMyShop(1L, request))
                .thenReturn(responseDTO);

        BarberShopResponseDTO response =
                controller.update(1L, request);

        assertNotNull(response);
        assertEquals("Nova Barbearia", response.getName());

        verify(barberShopService, times(1))
                .updateMyShop(1L, request);
    }

    @Test
    @DisplayName("Should delete barbershop successfully")
    void shouldDeleteBarberShopSuccessfully() {

        doNothing().when(barberShopService)
                .deleteMyShop(1L);

        controller.delete(1L);

        verify(barberShopService, times(1))
                .deleteMyShop(1L);
    }
}