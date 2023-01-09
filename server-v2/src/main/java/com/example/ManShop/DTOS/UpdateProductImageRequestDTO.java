package com.example.ManShop.DTOS;


import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.Valid;

@Data
@AllArgsConstructor
@Valid
public class UpdateProductImageRequestDTO {
    private Integer imgId;
    private Boolean isDefault;
    private String photo;
}
