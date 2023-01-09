package com.example.ManShop.DTOS;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PromotionProductDTO {
    private Integer id;
    private  double promotionPrice;
    private ProductResponeDTO product;
}
