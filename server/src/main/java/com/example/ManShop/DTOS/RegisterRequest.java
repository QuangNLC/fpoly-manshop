package com.example.ManShop.DTOS;

import com.example.ManShop.Entitys.Role;
import lombok.Data;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@Valid
public class RegisterRequest {
    @NotBlank(message = "khong duoc de trong username;")
    private String username;
    @Email(message = "khong dung dinh dang email")
    @NotBlank(message = "khong duoc de trong email")
    private String email;
    @NotBlank(message = "ho va ten khong duoc de trong")
     private String fullname;
    @NotNull(message = "khong duoc de trong so dien thoai")
   // @Length(min = 9,max = 11, message = "khong dung dinh dang sdt")
    private String phone;
    @NotBlank(message = "ban chua nhap mat khau")
    private String password;

    private Role role;


}
