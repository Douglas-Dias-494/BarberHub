package com.douglas.backend.auth.dto;

import com.douglas.backend.roles.UserRoles;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequestDTO {

    private String name;
    private String email;
    private String password;
    private UserRoles role;
}
