package com.example.ManShop.DTOS;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.Valid;

@Data
@AllArgsConstructor
@Valid
public class CreateProductRequestDTO {
    private String name;
    private String description;
    private Double price;
    private Integer categoryId;
    private Integer materialId;
    private Integer colorId;
    private Boolean isActive;
}
