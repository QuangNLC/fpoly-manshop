package com.example.ManShop.DTOS;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.Valid;

@Data
@AllArgsConstructor
@Valid
public class UpdateProductSizeRequestDTO {
    private Integer sizeId;
    private Boolean isActive;
    private Integer quantity;
}
