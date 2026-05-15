package com.douglas.backend.auth;
import com.douglas.backend.auth.dto.LoginRequestDTO;
import com.douglas.backend.auth.dto.LoginResponseDTO;
import com.douglas.backend.auth.dto.RegisterRequestDTO;
import com.douglas.backend.auth.dto.RegisterResponseDTO;
import com.douglas.backend.auth.jwt.JwtService;
import com.douglas.backend.enums.UserRoles;
import com.douglas.backend.user.UserEntity;
import com.douglas.backend.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {
    @Mock
    private UserRepository repository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private AuthService authService;

    private RegisterRequestDTO registerRequestDTO;
    private LoginRequestDTO loginRequestDTO;
    private UserEntity user;

    @BeforeEach
    void setUp() {

        registerRequestDTO = new RegisterRequestDTO();
        registerRequestDTO.setName("Douglas");
        registerRequestDTO.setEmail("douglas@email.com");
        registerRequestDTO.setPassword("123456");
        registerRequestDTO.setRole(UserRoles.CLIENT);

        loginRequestDTO = new LoginRequestDTO();
        loginRequestDTO.setEmail("douglas@email.com");
        loginRequestDTO.setPassword("123456");

        user = UserEntity.builder()
                .id(1L)
                .name("Douglas")
                .email("douglas@email.com")
                .password("encodedPassword")
                .role(UserRoles.CLIENT)
                .build();
    }

    @Test
    @DisplayName("Should register user successfully")
    void shouldRegisterUserSuccessfully() {

        when(passwordEncoder.encode("123456"))
                .thenReturn("encodedPassword");

        when(jwtService.generateToken("douglas@email.com"))
                .thenReturn("fake-jwt-token");

        when(repository.save(any(UserEntity.class)))
                .thenReturn(user);

        RegisterResponseDTO response = authService.register(registerRequestDTO);

        assertNotNull(response);
        assertEquals("Douglas", response.getName());
        assertEquals("douglas@email.com", response.getEmail());
        assertEquals(UserRoles.CLIENT, response.getRole());
        assertEquals("fake-jwt-token", response.getToken());

        verify(passwordEncoder, times(1))
                .encode("123456");

        verify(repository, times(1))
                .save(any(UserEntity.class));

        verify(jwtService, times(1))
                .generateToken("douglas@email.com");
    }

    @Test
    @DisplayName("Should login successfully")
    void shouldLoginSuccessfully() {

        when(repository.findByEmail("douglas@email.com"))
                .thenReturn(Optional.of(user));

        when(passwordEncoder.matches("123456", "encodedPassword"))
                .thenReturn(true);

        when(jwtService.generateToken("douglas@email.com"))
                .thenReturn("fake-jwt-token");

        LoginResponseDTO response = authService.login(loginRequestDTO);

        assertNotNull(response);
        assertEquals(1L, response.getId());
        assertEquals("Douglas", response.getName());
        assertEquals("douglas@email.com", response.getEmail());
        assertEquals(UserRoles.CLIENT, response.getRole());
        assertEquals("fake-jwt-token", response.getToken());

        verify(repository, times(1))
                .findByEmail("douglas@email.com");

        verify(passwordEncoder, times(1))
                .matches("123456", "encodedPassword");

        verify(jwtService, times(1))
                .generateToken("douglas@email.com");
    }

    @Test
    @DisplayName("Should throw exception when user is not found")
    void shouldThrowExceptionWhenUserNotFound() {

        when(repository.findByEmail("douglas@email.com"))
                .thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> authService.login(loginRequestDTO)
        );

        assertEquals("User Not Found", exception.getMessage());

        verify(repository, times(1))
                .findByEmail("douglas@email.com");

        verify(passwordEncoder, never())
                .matches(anyString(), anyString());

        verify(jwtService, never())
                .generateToken(anyString());
    }

    @Test
    @DisplayName("Should throw exception when password is invalid")
    void shouldThrowExceptionWhenPasswordIsInvalid() {

        when(repository.findByEmail("douglas@email.com"))
                .thenReturn(Optional.of(user));

        when(passwordEncoder.matches("123456", "encodedPassword"))
                .thenReturn(false);

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> authService.login(loginRequestDTO)
        );

        assertEquals("Invalid password...", exception.getMessage());

        verify(repository, times(1))
                .findByEmail("douglas@email.com");

        verify(passwordEncoder, times(1))
                .matches("123456", "encodedPassword");

        verify(jwtService, never())
                .generateToken(anyString());
    }
}
