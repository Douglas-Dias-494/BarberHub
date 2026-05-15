package com.douglas.backend.auth;

import com.douglas.backend.auth.dto.LoginRequestDTO;
import com.douglas.backend.auth.dto.LoginResponseDTO;
import com.douglas.backend.auth.dto.RegisterRequestDTO;
import com.douglas.backend.auth.dto.RegisterResponseDTO;
import com.douglas.backend.enums.UserRoles;
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
class AuthControllerTest {

    @Mock
    private AuthService service;

    @InjectMocks
    private AuthController controller;

    @Test
    @DisplayName("Should register user successfully")
    void shouldRegisterUserSuccessfully() {

        RegisterRequestDTO request = new RegisterRequestDTO();
        request.setName("Douglas");
        request.setEmail("douglas@email.com");
        request.setPassword("123456");
        request.setRole(UserRoles.CLIENT);

        RegisterResponseDTO responseDTO = new RegisterResponseDTO(
                "Douglas",
                "douglas@email.com",
                UserRoles.CLIENT,
                "fake-jwt-token"
        );

        when(service.register(request))
                .thenReturn(responseDTO);

        ResponseEntity<RegisterResponseDTO> response = controller.register(request);

        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());
        assertNotNull(response.getBody());

        assertEquals("Douglas", response.getBody().getName());
        assertEquals("douglas@email.com", response.getBody().getEmail());
        assertEquals(UserRoles.CLIENT, response.getBody().getRole());
        assertEquals("fake-jwt-token", response.getBody().getToken());

        verify(service, times(1))
                .register(request);
    }

    @Test
    @DisplayName("Should login successfully")
    void shouldLoginSuccessfully() {

        LoginRequestDTO request = new LoginRequestDTO();
        request.setEmail("douglas@email.com");
        request.setPassword("123456");

        LoginResponseDTO responseDTO = new LoginResponseDTO(
                1L,
                "douglas@email.com",
                "fake-jwt-token",
                "Douglas",
                UserRoles.CLIENT
        );

        when(service.login(request))
                .thenReturn(responseDTO);

        ResponseEntity<LoginResponseDTO> response = controller.login(request);

        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());
        assertNotNull(response.getBody());

        assertEquals(1L, response.getBody().getId());
        assertEquals("Douglas", response.getBody().getName());
        assertEquals("douglas@email.com", response.getBody().getEmail());
        assertEquals(UserRoles.CLIENT, response.getBody().getRole());
        assertEquals("fake-jwt-token", response.getBody().getToken());

        verify(service, times(1))
                .login(request);
    }
}