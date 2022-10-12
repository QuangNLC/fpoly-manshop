package com.example.ManShop.DTOS;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtRespone {
    private String token;
    private String type ="Bearer";
    private String username;
    private Long id;
    private List<String> role;

    public JwtRespone(String token, String username, List<String> role) {
        this.token = token;
        this.username = username;
        this.role = role;
    }
}
