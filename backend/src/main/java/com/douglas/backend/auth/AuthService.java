package com.douglas.backend.auth;

import com.douglas.backend.auth.dto.LoginRequestDTO;
import com.douglas.backend.auth.dto.LoginResponseDTO;
import com.douglas.backend.auth.dto.RegisterRequestDTO;
import com.douglas.backend.auth.dto.RegisterResponseDTO;
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

    public RegisterResponseDTO register(RegisterRequestDTO dto) {

        UserEntity user = UserEntity.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .password(passwordEncoder.encode(dto.getPassword()))
                .role(dto.getRole())
                .build();

        repository.save(user);
       String token = jwtService.generateToken(user.getEmail());

        return new RegisterResponseDTO(
                user.getName(),
                user.getEmail(),
                user.getRole(),
                token
        );
    }

    public LoginResponseDTO login(LoginRequestDTO dto) {

        UserEntity user = repository.findByEmail(dto.getEmail())
                        .orElseThrow(() -> new RuntimeException("User Not Found"));

        boolean passwordMatches = passwordEncoder.matches(
                dto.getPassword(),
                user.getPassword()
        );

        if (!passwordMatches) {
            throw new RuntimeException("Invalid password...");
        }

       String token = jwtService.generateToken(user.getEmail());

        return new LoginResponseDTO(
                user.getId(),
                user.getEmail(),
                token,
                user.getName(),
                user.getRole()
        );
    }
}