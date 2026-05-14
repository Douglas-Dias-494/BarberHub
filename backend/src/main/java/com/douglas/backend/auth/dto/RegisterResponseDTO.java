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
public class RegisterResponseDTO {

    private String name;
    private String email;
    private UserRoles role;
    private String token;
}
