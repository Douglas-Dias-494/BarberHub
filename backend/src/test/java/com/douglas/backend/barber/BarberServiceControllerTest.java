package com.douglas.backend.barber;

import com.douglas.backend.barber.dto.BarberServiceRequestDTO;
import com.douglas.backend.barber.dto.BarberServiceResponseDTO;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BarberServiceControllerTest {

    @Mock
    private BarberServiceService barberServiceService;

    @InjectMocks
    private BarberServiceController controller;

    @Test
    @DisplayName("Should create service successfully")
    void shouldCreateServiceSuccessfully() {

        BarberServiceRequestDTO request =
                new BarberServiceRequestDTO(
                        "Corte",
                        35.00,
                        45
                );

        BarberServiceResponseDTO responseDTO =
                new BarberServiceResponseDTO(
                        1L,
                        "Corte",
                        35.00,
                        45,
                        "Barbearia do Corte"
                );

        when(barberServiceService.createService(1L, request))
                .thenReturn(responseDTO);

        BarberServiceResponseDTO response =
                controller.createService(1L, request);

        assertNotNull(response);
        assertEquals("Corte", response.name());

        verify(barberServiceService, times(1))
                .createService(1L, request);
    }

    @Test
    @DisplayName("Should return all services successfully")
    void shouldReturnAllServicesSuccessfully() {

        List<BarberServiceResponseDTO> services =
                List.of(
                        new BarberServiceResponseDTO(
                                1L,
                                "Corte",
                                35.00,
                                45,
                                "Barbearia do Corte"
                        ),
                        new BarberServiceResponseDTO(
                                2L,
                                "Barba",
                                20.00,
                                30,
                                "Barbearia do Corte"
                        )
                );

        when(barberServiceService.findAllServicesByShopId(1L))
                .thenReturn(services);

        List<BarberServiceResponseDTO> response =
                controller.getServices(1L);

        assertNotNull(response);
        assertEquals(2, response.size());

        verify(barberServiceService, times(1))
                .findAllServicesByShopId(1L);
    }

    @Test
    @DisplayName("Should update service successfully")
    void shouldUpdateServiceSuccessfully() {

        BarberServiceRequestDTO request =
                new BarberServiceRequestDTO(
                        "Corte Premium",
                        50.00,
                        60
                );

        BarberServiceResponseDTO responseDTO =
                new BarberServiceResponseDTO(
                        1L,
                        "Corte Premium",
                        50.00,
                        60,
                        "Barbearia do Corte"
                );

        when(barberServiceService.updateService(1L, 1L, request))
                .thenReturn(responseDTO);

        BarberServiceResponseDTO response =
                controller.updateService(1L, 1L, request);

        assertNotNull(response);
        assertEquals("Corte Premium", response.name());

        verify(barberServiceService, times(1))
                .updateService(1L, 1L, request);
    }

    @Test
    @DisplayName("Should delete service successfully")
    void shouldDeleteServiceSuccessfully() {

        doNothing().when(barberServiceService)
                .deleteService(1L, 1L);

        controller.deleteService(1L, 1L);

        verify(barberServiceService, times(1))
                .deleteService(1L, 1L);
    }
}