package com.example.ManShop.DTOS;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.Valid;

@Data
@AllArgsConstructor
@Valid
public class CreateProductSizeRequestDTO {
    private Integer sizeId;
    private int quantity;
}
