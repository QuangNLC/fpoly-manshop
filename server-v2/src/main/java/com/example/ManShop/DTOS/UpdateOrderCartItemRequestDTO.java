package com.example.ManShop.DTOS;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.Valid;

@Data
@AllArgsConstructor
@Valid
public class UpdateOrderCartItemRequestDTO {
    private Integer orderId;
    private int quantity;
    private String updatedUser;
    private Integer sizeId;
}
