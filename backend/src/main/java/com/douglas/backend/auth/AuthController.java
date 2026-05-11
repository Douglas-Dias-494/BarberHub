package com.douglas.backend.auth;

import com.douglas.backend.auth.dto.LoginRequestDTO;
import com.douglas.backend.auth.dto.LoginResponseDTO;
import com.douglas.backend.auth.dto.RegisterRequestDTO;
import com.douglas.backend.auth.dto.RegisterResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService service;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDTO> register(@RequestBody RegisterRequestDTO dto) {
        return ResponseEntity.ok(service.register(dto));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO dto) {
        return ResponseEntity.ok(service.login(dto));
    }
}