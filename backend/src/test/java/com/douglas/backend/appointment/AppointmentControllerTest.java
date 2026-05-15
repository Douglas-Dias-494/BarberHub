package com.douglas.backend.appointment;

import com.douglas.backend.appointment.dto.AppointmentRequestDTO;
import com.douglas.backend.appointment.dto.AppointmentResponseDTO;
import com.douglas.backend.enums.AppointmentStatus;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AppointmentControllerTest {

    @Mock
    private AppointmentService service;

    @InjectMocks
    private AppointmentController controller;

    @Test
    @DisplayName("Should create appointment successfully")
    void shouldCreateAppointmentSuccessfully() {

        AppointmentRequestDTO request =
                new AppointmentRequestDTO(
                        1L,
                        1L,
                        LocalDate.now(),
                        LocalTime.of(14, 0),
                        "Teste"
                );

        AppointmentResponseDTO responseDTO =
                new AppointmentResponseDTO(
                        1L,
                        "Douglas",
                        "Barbearia",
                        "Corte",
                        LocalDate.now(),
                        LocalTime.of(14, 0),
                        35.00,
                        AppointmentStatus.PENDING,
                        "Teste"
                );

        when(service.create(request))
                .thenReturn(responseDTO);

        ResponseEntity<AppointmentResponseDTO> response =
                controller.create(request);

        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());
        assertNotNull(response.getBody());

        verify(service, times(1))
                .create(request);
    }

    @Test
    @DisplayName("Should return pending appointments")
    void shouldReturnPendingAppointments() {

        List<AppointmentResponseDTO> appointments =
                List.of(mock(AppointmentResponseDTO.class));

        when(service.getPendingAppointments(1L))
                .thenReturn(appointments);

        ResponseEntity<List<AppointmentResponseDTO>> response =
                controller.getPendingAppointments(1L);

        assertEquals(200, response.getStatusCode().value());
        assert response.getBody() != null;
        assertEquals(1, response.getBody().size());

        verify(service, times(1))
                .getPendingAppointments(1L);
    }

    @Test
    @DisplayName("Should return all appointments")
    void shouldReturnAllAppointments() {

        List<AppointmentResponseDTO> appointments =
                List.of(mock(AppointmentResponseDTO.class));

        when(service.findAllById(1L))
                .thenReturn(appointments);

        ResponseEntity<List<AppointmentResponseDTO>> response =
                controller.getAppointments(1L);

        assertEquals(200, response.getStatusCode().value());
        assert response.getBody() != null;
        assertEquals(1, response.getBody().size());

        verify(service, times(1))
                .findAllById(1L);
    }

    @Test
    @DisplayName("Should return confirmed appointments")
    void shouldReturnConfirmedAppointments() {

        List<AppointmentResponseDTO> appointments =
                List.of(mock(AppointmentResponseDTO.class));

        when(service.getConfirmedAppointments(1L))
                .thenReturn(appointments);

        ResponseEntity<List<AppointmentResponseDTO>> response =
                controller.getConfirmedAppointments(1L);

        assertEquals(200, response.getStatusCode().value());
        assert response.getBody() != null;
        assertEquals(1, response.getBody().size());

        verify(service, times(1))
                .getConfirmedAppointments(1L);
    }

    @Test
    @DisplayName("Should approve appointment successfully")
    void shouldApproveAppointmentSuccessfully() {

        AppointmentResponseDTO responseDTO =
                mock(AppointmentResponseDTO.class);

        when(service.approve(1L))
                .thenReturn(responseDTO);

        ResponseEntity<AppointmentResponseDTO> response =
                controller.approve(1L);

        assertEquals(200, response.getStatusCode().value());

        verify(service, times(1))
                .approve(1L);
    }

    @Test
    @DisplayName("Should reject appointment successfully")
    void shouldRejectAppointmentSuccessfully() {

        AppointmentResponseDTO responseDTO =
                mock(AppointmentResponseDTO.class);

        when(service.reject(1L))
                .thenReturn(responseDTO);

        ResponseEntity<AppointmentResponseDTO> response =
                controller.reject(1L);

        assertEquals(200, response.getStatusCode().value());

        verify(service, times(1))
                .reject(1L);
    }

    @Test
    @DisplayName("Should return my appointments")
    void shouldReturnMyAppointments() {

        List<AppointmentResponseDTO> appointments =
                List.of(mock(AppointmentResponseDTO.class));

        when(service.getMyAppointments())
                .thenReturn(appointments);

        ResponseEntity<List<AppointmentResponseDTO>> response =
                controller.myAppointments();

        assertEquals(200, response.getStatusCode().value());
        assert response.getBody() != null;
        assertEquals(1, response.getBody().size());

        verify(service, times(1))
                .getMyAppointments();
    }
}