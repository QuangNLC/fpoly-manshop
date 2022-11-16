package com.example.ManShop.DTOS;

import com.example.ManShop.Entitys.Categorys;
import com.example.ManShop.Entitys.Images;
import com.example.ManShop.Entitys.ProductSize;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class ProductResponeDTO {
    private int id;
    private  double import_price;
    private Date create_date;
    private Date update_create_date;
    private String name;
    private String title;
    private Categorys category;
    private List<ProductSize> productsizes;
    private List<Images> images;
}
