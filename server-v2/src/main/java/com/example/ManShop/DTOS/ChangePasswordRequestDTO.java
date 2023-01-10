package com.example.ManShop.DTOS;

import lombok.Data;

@Data
public class ChangePasswordRequestDTO {
    private  String password;
    private  String newPassword;
}
