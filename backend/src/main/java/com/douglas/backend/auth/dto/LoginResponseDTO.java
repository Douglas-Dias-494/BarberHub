package com.douglas.backend.auth.dto;
import com.douglas.backend.enums.UserRoles;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponseDTO {
    Long id;
    private String email;
    private String token;
    private String name;
    private UserRoles role;
}