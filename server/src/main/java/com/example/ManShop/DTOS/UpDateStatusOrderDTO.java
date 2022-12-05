package com.example.ManShop.DTOS;

import com.example.ManShop.Entitys.Users;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.Valid;

@Data
@AllArgsConstructor
@Valid
public class UpDateStatusOrderDTO {
    // user de update nhe
    private Users users;
    private String  DescriptionOder;
    private String statusOrder;
    private  Boolean isFinish;


}
