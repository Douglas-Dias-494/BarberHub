package com.douglas.backend.auth.jwt;

import com.douglas.backend.user.UserEntity;
import com.douglas.backend.user.UserRepository;
import com.douglas.backend.enums.UserRoles;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.core.context.SecurityContextHolder;

import java.io.IOException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class JwtAuthenticationFilterTest {

    @Mock
    private JwtService jwtService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private FilterChain filterChain;

    @InjectMocks
    private JwtAuthenticationFilter filter;

    private MockHttpServletRequest request;
    private MockHttpServletResponse response;

    private UserEntity user;

    @BeforeEach
    void setUp() {

        request = new MockHttpServletRequest();
        response = new MockHttpServletResponse();

        user = UserEntity.builder()
                .id(1L)
                .name("Douglas")
                .email("douglas@email.com")
                .password("123456")
                .role(UserRoles.CLIENT)
                .build();

        SecurityContextHolder.clearContext();
    }

    @AfterEach
    void tearDown() {
        SecurityContextHolder.clearContext();
    }

    @Test
    @DisplayName("Should continue filter chain when authorization header is null")
    void shouldContinueFilterChainWhenAuthorizationHeaderIsNull()
            throws ServletException, IOException {

        filter.doFilterInternal(request, response, filterChain);

        verify(filterChain, times(1))
                .doFilter(request, response);

        verifyNoInteractions(jwtService);
    }

    @Test
    @DisplayName("Should continue filter chain when authorization header is invalid")
    void shouldContinueFilterChainWhenAuthorizationHeaderIsInvalid()
            throws ServletException, IOException {

        request.addHeader("Authorization", "InvalidToken");

        filter.doFilterInternal(request, response, filterChain);

        verify(filterChain, times(1))
                .doFilter(request, response);

        verifyNoInteractions(jwtService);
    }

    @Test
    @DisplayName("Should authenticate user successfully")
    void shouldAuthenticateUserSuccessfully()
            throws ServletException, IOException {

        String token = "valid-token";

        request.addHeader("Authorization", "Bearer " + token);

        when(jwtService.extractEmail(token))
                .thenReturn("douglas@email.com");

        when(userRepository.findByEmail("douglas@email.com"))
                .thenReturn(Optional.of(user));

        when(jwtService.isTokenValid(token, "douglas@email.com"))
                .thenReturn(true);

        filter.doFilterInternal(request, response, filterChain);

        assertNotNull(SecurityContextHolder.getContext().getAuthentication());

        assertEquals(
                "douglas@email.com",
                SecurityContextHolder.getContext()
                        .getAuthentication()
                        .getPrincipal()
        );

        verify(jwtService, times(1))
                .extractEmail(token);

        verify(userRepository, times(1))
                .findByEmail("douglas@email.com");

        verify(jwtService, times(1))
                .isTokenValid(token, "douglas@email.com");

        verify(filterChain, times(1))
                .doFilter(request, response);
    }

    @Test
    @DisplayName("Should not authenticate when token is invalid")
    void shouldNotAuthenticateWhenTokenIsInvalid()
            throws ServletException, IOException {

        String token = "invalid-token";

        request.addHeader("Authorization", "Bearer " + token);

        when(jwtService.extractEmail(token))
                .thenReturn("douglas@email.com");

        when(userRepository.findByEmail("douglas@email.com"))
                .thenReturn(Optional.of(user));

        when(jwtService.isTokenValid(token, "douglas@email.com"))
                .thenReturn(false);

        filter.doFilterInternal(request, response, filterChain);

        assertNull(SecurityContextHolder.getContext().getAuthentication());

        verify(filterChain, times(1))
                .doFilter(request, response);
    }

    @Test
    @DisplayName("Should not authenticate when user is not found")
    void shouldNotAuthenticateWhenUserIsNotFound()
            throws ServletException, IOException {

        String token = "valid-token";

        request.addHeader("Authorization", "Bearer " + token);

        when(jwtService.extractEmail(token))
                .thenReturn("douglas@email.com");

        when(userRepository.findByEmail("douglas@email.com"))
                .thenReturn(Optional.empty());

        filter.doFilterInternal(request, response, filterChain);

        assertNull(SecurityContextHolder.getContext().getAuthentication());

        verify(filterChain, times(1))
                .doFilter(request, response);
    }

    @Test
    @DisplayName("Should clear security context when exception occurs")
    void shouldClearSecurityContextWhenExceptionOccurs()
            throws ServletException, IOException {

        String token = "invalid-token";

        request.addHeader("Authorization", "Bearer " + token);

        when(jwtService.extractEmail(token))
                .thenThrow(new RuntimeException("Invalid token"));

        filter.doFilterInternal(request, response, filterChain);

        assertNull(SecurityContextHolder.getContext().getAuthentication());

        verify(filterChain, times(1))
                .doFilter(request, response);
    }
}