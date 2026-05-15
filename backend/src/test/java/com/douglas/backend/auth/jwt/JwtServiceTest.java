package com.douglas.backend.auth.jwt;

import io.jsonwebtoken.JwtException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;

class JwtServiceTest {

    private JwtService jwtService;

    private final String SECRET =
            "mySuperSecretKeymySuperSecretKey123456";

    @BeforeEach
    void setUp() {

        jwtService = new JwtService();

        ReflectionTestUtils.setField(
                jwtService,
                "secret",
                SECRET
        );
    }

    @Test
    @DisplayName("Should generate token successfully")
    void shouldGenerateTokenSuccessfully() {

        String token = jwtService.generateToken("douglas@email.com");

        assertNotNull(token);
        assertFalse(token.isBlank());
    }

    @Test
    @DisplayName("Should extract email from token")
    void shouldExtractEmailFromToken() {

        String token = jwtService.generateToken("douglas@email.com");

        String email = jwtService.extractEmail(token);

        assertEquals("douglas@email.com", email);
    }

    @Test
    @DisplayName("Should validate token successfully")
    void shouldValidateTokenSuccessfully() {

        String token = jwtService.generateToken("douglas@email.com");

        boolean isValid = jwtService.isTokenValid(
                token,
                "douglas@email.com"
        );

        assertTrue(isValid);
    }

    @Test
    @DisplayName("Should return false when email is different")
    void shouldReturnFalseWhenEmailIsDifferent() {

        String token = jwtService.generateToken("douglas@email.com");

        boolean isValid = jwtService.isTokenValid(
                token,
                "other@email.com"
        );

        assertFalse(isValid);
    }

    @Test
    @DisplayName("Should return false when token is invalid")
    void shouldReturnFalseWhenTokenIsInvalid() {

        boolean isValid = jwtService.isTokenValid(
                "invalid-token",
                "douglas@email.com"
        );

        assertFalse(isValid);
    }

    @Test
    @DisplayName("Should throw exception when extracting invalid token")
    void shouldThrowExceptionWhenExtractingInvalidToken() {

        assertThrows(
                JwtException.class,
                () -> jwtService.extractEmail("invalid-token")
        );
    }
}