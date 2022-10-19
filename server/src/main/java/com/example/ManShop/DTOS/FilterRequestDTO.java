package com.example.ManShop.DTOS;


import lombok.Data;

import java.util.List;

@Data
public class FilterRequestDTO {
    private Integer categoryId;
    private List<String> sizes;
    private Double minPrice;
    private Double maxPrice;
}
