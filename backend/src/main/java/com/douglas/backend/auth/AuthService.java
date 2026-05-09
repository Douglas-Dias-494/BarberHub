package com.douglas.backend.auth;

import com.douglas.backend.auth.dto.RegisterRequestDTO;
import com.douglas.backend.auth.jwt.JwtService;
import com.douglas.backend.user.UserEntity;
import com.douglas.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public String register(RegisterRequestDTO dto) {

        UserEntity user = UserEntity.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .password(passwordEncoder.encode(dto.getPassword()))
                .role(dto.getRole())
                .build();

        repository.save(user);

        return jwtService.generateToken(user.getEmail());
    }
}