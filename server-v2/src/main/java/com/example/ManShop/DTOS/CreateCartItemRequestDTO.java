package com.example.ManShop.DTOS;


import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.Valid;

@Data
@AllArgsConstructor
@Valid
public class CreateCartItemRequestDTO {
    private double price;
    private double discount;
    private int quantity;
    private String size;
    private Integer sizeId;
    private Integer productId;
    private String updatedUser;

}
