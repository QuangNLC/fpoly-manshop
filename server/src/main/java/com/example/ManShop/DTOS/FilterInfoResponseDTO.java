package com.example.ManShop.DTOS;

import com.example.ManShop.Entitys.Categorys;
import com.example.ManShop.Entitys.Sizes;
import lombok.Data;

import java.util.List;

@Data
public class FilterInfoResponseDTO {
    private List<Categorys> categories;
    private List<Sizes> sizes;
    private Double maxPrice;
}
