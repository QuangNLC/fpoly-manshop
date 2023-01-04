package com.example.ManShop.DTOS;

import com.example.ManShop.Entitys.Categories;
import com.example.ManShop.Entitys.Colors;
import com.example.ManShop.Entitys.Materials;
import com.example.ManShop.Entitys.Sizes;
import lombok.Data;

import java.util.List;


@Data
public class FilterInfoResponseDTO {
    private List<Categories> categories;
    private List<Sizes> sizes;
    private List<Colors> colors;
    private List<Materials> materials;
    private Double maxPrice;
}
