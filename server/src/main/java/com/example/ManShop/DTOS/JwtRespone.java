package com.example.ManShop.DTOS;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtRespone {
    @NotBlank
    private String token;
    private String type ="Bearer";
    @NotBlank(message = "không được để trống thông tin")
    private String username;
    @NotBlank(message = "không được để trống thông tin")
    private Long id;
    @NotBlank
    private List<String> role;

    public JwtRespone(String token, String username, List<String> role) {
        this.token = token;
        this.username = username;
        this.role = role;
    }
}
