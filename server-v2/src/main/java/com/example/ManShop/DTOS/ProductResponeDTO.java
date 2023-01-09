package com.example.ManShop.DTOS;

import com.example.ManShop.Entitys.Categories;
import com.example.ManShop.Entitys.Images;
import com.example.ManShop.Entitys.ProductSize;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponeDTO {
    private int id;
    private  double price;
    private Date createdAt;
    private String name;
    private String descTitle;
    private Boolean isActive;
    private Categories category;
    private List<ProductSize> productsizes;
    private List<Images> images;
}
