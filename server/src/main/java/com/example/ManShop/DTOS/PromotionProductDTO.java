package com.example.ManShop.DTOS;

import lombok.Data;

@Data
public class PromotionProductDTO {
    private Integer id;
    private  double promotionPrice;
    private ProductResponeDTO product;
}
