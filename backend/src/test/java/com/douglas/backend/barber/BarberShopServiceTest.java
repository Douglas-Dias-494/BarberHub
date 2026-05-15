package com.douglas.backend.barber;

import com.douglas.backend.barber.dto.BarberShopRequestDTO;
import com.douglas.backend.barber.dto.BarberShopResponseDTO;
import com.douglas.backend.geocoding.GeocodingService;
import com.douglas.backend.user.UserEntity;
import com.douglas.backend.user.UserRepository;
import com.douglas.backend.enums.UserRoles;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BarberShopServiceTest {

    @Mock
    private BarberShopRepository barberShopRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private GeocodingService geocodingService;

    @InjectMocks
    private BarberShopService service;

    private UserEntity owner;
    private BarberShopEntity barberShop;
    private BarberShopRequestDTO requestDTO;

    @BeforeEach
    void setUp() {

        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(
                        "douglas@email.com",
                        null
                )
        );

        owner = UserEntity.builder()
                .id(1L)
                .name("Douglas")
                .email("douglas@email.com")
                .role(UserRoles.CLIENT)
                .build();

        barberShop = BarberShopEntity.builder()
                .id(1L)
                .name("Barbearia Douglas")
                .address("Rua A")
                .phone("11999999999")
                .openDays("Segunda à sexta")
                .openHour("08:00")
                .closeHour("19:00")
                .latitude(-23.0)
                .longitude(-46.0)
                .owner(owner)
                .build();

        requestDTO = new BarberShopRequestDTO();
        requestDTO.setName("Barbearia Douglas");
        requestDTO.setAddress("Rua A");
        requestDTO.setPhone("11999999999");
        requestDTO.setOpenDays("Segunda à sexta");
        requestDTO.setOpenHour("08:00");
        requestDTO.setCloseHour("19:00");
    }

    @AfterEach
    void tearDown() {
        SecurityContextHolder.clearContext();
    }

    @Test
    @DisplayName("Should create barbershop successfully")
    void shouldCreateBarberShopSuccessfully() {

        when(userRepository.findByEmail("douglas@email.com"))
                .thenReturn(Optional.of(owner));

        when(geocodingService.findCoordinates("Rua A"))
                .thenReturn(new GeocodingService().findCoordinates("Rua da Prata, Barueri-SP"));

        when(barberShopRepository.save(any(BarberShopEntity.class)))
                .thenReturn(barberShop);

        BarberShopResponseDTO response = service.createMyBarberShop(requestDTO);

        assertNotNull(response);
        assertEquals("Barbearia Douglas", response.getName());
        assertEquals("Rua A", response.getAddress());
        assertEquals("11999999999", response.getPhone());
        assertEquals(-23.0, response.getLatitude());
        assertEquals(-46.0, response.getLongitude());

        verify(userRepository, times(1))
                .findByEmail("douglas@email.com");

        verify(geocodingService, times(1))
                .findCoordinates("Rua A");

        verify(barberShopRepository, times(1))
                .save(any(BarberShopEntity.class));
    }

    @Test
    @DisplayName("Should throw exception when user is not found")
    void shouldThrowExceptionWhenUserIsNotFound() {

        when(userRepository.findByEmail("douglas@email.com"))
                .thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> service.createMyBarberShop(requestDTO)
        );

        assertEquals("User not found...", exception.getMessage());

        verify(barberShopRepository, never())
                .save(any());
    }

    @Test
    @DisplayName("Should return my shop successfully")
    void shouldReturnMyShopSuccessfully() {

        when(userRepository.findByEmail("douglas@email.com"))
                .thenReturn(Optional.of(owner));

        when(barberShopRepository.findByOwnerId(1L))
                .thenReturn(Optional.of(barberShop));

        BarberShopResponseDTO response = service.getMyShop();

        assertNotNull(response);
        assertEquals("Barbearia Douglas", response.getName());

        verify(barberShopRepository, times(1))
                .findByOwnerId(1L);
    }

    @Test
    @DisplayName("Should return null when shop does not exist")
    void shouldReturnNullWhenShopDoesNotExist() {

        when(userRepository.findByEmail("douglas@email.com"))
                .thenReturn(Optional.of(owner));

        when(barberShopRepository.findByOwnerId(1L))
                .thenReturn(Optional.empty());

        BarberShopResponseDTO response = service.getMyShop();

        assertNull(response);
    }

    @Test
    @DisplayName("Should update barbershop successfully")
    void shouldUpdateBarberShopSuccessfully() {

        BarberShopRequestDTO updateDTO = new BarberShopRequestDTO();
        updateDTO.setName("Nova Barbearia");
        updateDTO.setAddress("Rua Nova");
        updateDTO.setPhone("11888888888");
        updateDTO.setOpenDays("Segunda à sabado");
        updateDTO.setOpenHour("10:00");
        updateDTO.setCloseHour("21:00");

        when(barberShopRepository.findById(1L))
                .thenReturn(Optional.of(barberShop));

        when(geocodingService.findCoordinates("Rua Nova"))
                .thenReturn(new GeocodingService().findCoordinates("Estrada dos reis, Cabelolândia-SP"));

        when(barberShopRepository.save(any(BarberShopEntity.class)))
                .thenReturn(barberShop);

        BarberShopResponseDTO response =
                service.updateMyShop(1L, updateDTO);

        assertNotNull(response);

        verify(barberShopRepository, times(1))
                .findById(1L);

        verify(geocodingService, times(1))
                .findCoordinates("Rua Nova");

        verify(barberShopRepository, times(1))
                .save(any(BarberShopEntity.class));
    }

    @Test
    @DisplayName("Should throw exception when updating non existing barbershop")
    void shouldThrowExceptionWhenUpdatingNonExistingBarberShop() {

        when(barberShopRepository.findById(1L))
                .thenReturn(Optional.empty());

        ResponseStatusException exception = assertThrows(
                ResponseStatusException.class,
                () -> service.updateMyShop(1L, requestDTO)
        );

        assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
        assertEquals("404 NOT_FOUND \"Barbershop not found\"", exception.getMessage());
    }

    @Test
    @DisplayName("Should delete barbershop successfully")
    void shouldDeleteBarberShopSuccessfully() {

        when(barberShopRepository.findById(1L))
                .thenReturn(Optional.of(barberShop));

        service.deleteMyShop(1L);

        verify(barberShopRepository, times(1))
                .delete(barberShop);
    }

    @Test
    @DisplayName("Should throw exception when deleting non existing barbershop")
    void shouldThrowExceptionWhenDeletingNonExistingBarberShop() {

        when(barberShopRepository.findById(1L))
                .thenReturn(Optional.empty());

        ResponseStatusException exception = assertThrows(
                ResponseStatusException.class,
                () -> service.deleteMyShop(1L)
        );

        assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
        assertEquals("404 NOT_FOUND \"BarberShop not found\"", exception.getMessage());

        verify(barberShopRepository, never())
                .delete(any());
    }
}