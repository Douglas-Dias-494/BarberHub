package com.douglas.backend.appointment;

import com.douglas.backend.appointment.dto.AppointmentRequestDTO;
import com.douglas.backend.appointment.dto.AppointmentResponseDTO;
import com.douglas.backend.barber.BarberServiceEntity;
import com.douglas.backend.barber.BarberServiceRepository;
import com.douglas.backend.barber.BarberShopEntity;
import com.douglas.backend.barber.BarberShopRepository;
import com.douglas.backend.enums.AppointmentStatus;
import com.douglas.backend.enums.UserRoles;
import com.douglas.backend.user.UserEntity;
import com.douglas.backend.user.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AppointmentServiceTest {

    @Mock
    private AppointmentRepository repository;

    @Mock
    private SimpMessagingTemplate messagingTemplate;

    @Mock
    private UserRepository userRepository;

    @Mock
    private BarberShopRepository barberShopRepository;

    @Mock
    private BarberServiceRepository barberServiceRepository;

    @InjectMocks
    private AppointmentService service;

    @AfterEach
    void tearDown() {
        SecurityContextHolder.clearContext();
    }

    @Test
    @DisplayName("Should create appointment successfully")
    void shouldCreateAppointmentSuccessfully() {

        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(
                        "client@email.com",
                        null
                )
        );

        UserEntity client = UserEntity.builder()
                .id(1L)
                .name("Douglas")
                .email("client@email.com")
                .role(UserRoles.CLIENT)
                .build();

        UserEntity owner = UserEntity.builder()
                .id(2L)
                .name("Owner")
                .email("owner@email.com")
                .role(UserRoles.BARBER)
                .build();

        BarberShopEntity shop = BarberShopEntity.builder()
                .id(1L)
                .name("Barbearia")
                .owner(owner)
                .build();

        BarberServiceEntity barberService = BarberServiceEntity.builder()
                .id(1L)
                .name("Corte")
                .price(35.00)
                .build();

        AppointmentEntity appointment = AppointmentEntity.builder()
                .id(1L)
                .client(client)
                .barberShop(shop)
                .service(barberService)
                .appointmentDate(LocalDate.now())
                .appointmentHour(LocalTime.of(14, 0))
                .notes("Teste")
                .totalPrice(35.00)
                .status(AppointmentStatus.PENDING)
                .build();

        AppointmentRequestDTO request =
                new AppointmentRequestDTO(
                        1L,
                        1L,
                        LocalDate.now(),
                        LocalTime.of(14, 0),
                        "Teste"
                );

        when(userRepository.findByEmail("client@email.com"))
                .thenReturn(Optional.of(client));

        when(barberShopRepository.findById(1L))
                .thenReturn(Optional.of(shop));

        when(barberServiceRepository.findById(1L))
                .thenReturn(Optional.of(barberService));

        when(repository.save(any(AppointmentEntity.class)))
                .thenReturn(appointment);

        AppointmentResponseDTO response = service.create(request);

        assertNotNull(response);
        assertEquals("Douglas", response.clientName());
        assertEquals("Barbearia", response.barberShopName());
        assertEquals("Corte", response.serviceName());

        verify(repository, times(1))
                .save(any(AppointmentEntity.class));

        verify(messagingTemplate, times(1))
                .convertAndSend(
                        contains("/topic/barber/2"),
                        Optional.ofNullable(any())
                );
    }

    @Test
    @DisplayName("Should approve appointment successfully")
    void shouldApproveAppointmentSuccessfully() {

        UserEntity client = UserEntity.builder()
                .id(1L)
                .name("Douglas")
                .email("client@email.com")
                .build();

        BarberShopEntity shop = BarberShopEntity.builder()
                .id(1L)
                .name("Barbearia")
                .build();

        BarberServiceEntity barberService = BarberServiceEntity.builder()
                .id(1L)
                .name("Corte")
                .price(35.00)
                .build();

        AppointmentEntity appointment = AppointmentEntity.builder()
                .id(1L)
                .client(client)
                .barberShop(shop)
                .service(barberService)
                .appointmentDate(LocalDate.now())
                .appointmentHour(LocalTime.of(14, 0))
                .notes("Teste")
                .totalPrice(35.00)
                .status(AppointmentStatus.PENDING)
                .build();

        when(repository.findById(1L))
                .thenReturn(Optional.of(appointment));

        when(repository.save(any(AppointmentEntity.class)))
                .thenReturn(appointment);

        AppointmentResponseDTO response =
                service.approve(1L);

        assertNotNull(response);

        verify(repository, times(1))
                .save(appointment);

        assertEquals(
                AppointmentStatus.CONFIRMED,
                appointment.getStatus()
        );
    }

    @Test
    @DisplayName("Should reject appointment successfully")
    void shouldRejectAppointmentSuccessfully() {

        UserEntity client = UserEntity.builder()
                .id(1L)
                .name("Douglas")
                .email("client@email.com")
                .build();

        BarberShopEntity shop = BarberShopEntity.builder()
                .id(1L)
                .name("Barbearia")
                .build();

        BarberServiceEntity barberService = BarberServiceEntity.builder()
                .id(1L)
                .name("Corte")
                .price(35.00)
                .build();

        AppointmentEntity appointment = AppointmentEntity.builder()
                .id(1L)
                .client(client)
                .barberShop(shop)
                .service(barberService)
                .appointmentDate(LocalDate.now())
                .appointmentHour(LocalTime.of(14, 0))
                .notes("Teste")
                .totalPrice(35.00)
                .status(AppointmentStatus.PENDING)
                .build();

        when(repository.findById(1L))
                .thenReturn(Optional.of(appointment));

        when(repository.save(any(AppointmentEntity.class)))
                .thenReturn(appointment);

        AppointmentResponseDTO response =
                service.reject(1L);

        assertNotNull(response);

        verify(repository, times(1))
                .save(appointment);

        assertEquals(
                AppointmentStatus.REJECTED,
                appointment.getStatus()
        );
    }

    @Test
    @DisplayName("Should return pending appointments")
    void shouldReturnPendingAppointments() {

        List<AppointmentResponseDTO> appointments =
                List.of(mock(AppointmentResponseDTO.class));

        when(repository.findByBarberShopIdAndStatus(
                1L,
                AppointmentStatus.PENDING
        )).thenReturn(appointments);

        List<AppointmentResponseDTO> response =
                service.getPendingAppointments(1L);

        assertEquals(1, response.size());

        verify(repository, times(1))
                .findByBarberShopIdAndStatus(
                        1L,
                        AppointmentStatus.PENDING
                );
    }

    @Test
    @DisplayName("Should return confirmed appointments")
    void shouldReturnConfirmedAppointments() {

        List<AppointmentResponseDTO> appointments =
                List.of(mock(AppointmentResponseDTO.class));

        when(repository.findByBarberShopIdAndStatus(
                1L,
                AppointmentStatus.CONFIRMED
        )).thenReturn(appointments);

        List<AppointmentResponseDTO> response =
                service.getConfirmedAppointments(1L);

        assertEquals(1, response.size());

        verify(repository, times(1))
                .findByBarberShopIdAndStatus(
                        1L,
                        AppointmentStatus.CONFIRMED
                );
    }

    @Test
    @DisplayName("Should return my appointments")
    void shouldReturnMyAppointments() {

        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(
                        "client@email.com",
                        null
                )
        );

        List<AppointmentResponseDTO> appointments =
                List.of(mock(AppointmentResponseDTO.class));

        when(repository.findByClientEmail("client@email.com"))
                .thenReturn(appointments);

        List<AppointmentResponseDTO> response =
                service.getMyAppointments();

        assertEquals(1, response.size());

        verify(repository, times(1))
                .findByClientEmail("client@email.com");
    }

    @Test
    @DisplayName("Should return all appointments by shop id")
    void shouldReturnAllAppointmentsByShopId() {

        List<AppointmentResponseDTO> appointments =
                List.of(mock(AppointmentResponseDTO.class));

        when(repository.findByBarberShopId(1L))
                .thenReturn(appointments);

        List<AppointmentResponseDTO> response =
                service.findAllById(1L);

        assertEquals(1, response.size());

        verify(repository, times(1))
                .findByBarberShopId(1L);
    }
}