package com.example.ManShop.DTOS;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class LoginRequest {
    @NotBlank(message = "Không để trống thông tin username")
    private String username;
    @NotBlank(message = "Không để trống thông tin password")
    private String password;
}
