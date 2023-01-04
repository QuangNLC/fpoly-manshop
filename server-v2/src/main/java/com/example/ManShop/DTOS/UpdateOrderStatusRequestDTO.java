package com.example.ManShop.DTOS;

import com.example.ManShop.Entitys.Users;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.Valid;

@Data
@AllArgsConstructor
@Valid
public class UpdateOrderStatusRequestDTO {
    private Integer orderId;
    private String updatedUser;
    private String description;
    private Integer statusOrderId;
}
