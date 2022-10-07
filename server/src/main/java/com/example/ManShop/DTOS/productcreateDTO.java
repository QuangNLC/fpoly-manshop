package com.example.ManShop.DTOS;

import com.example.ManShop.Entitys.*;
import lombok.Data;

import java.sql.Date;
import java.util.List;

@Data
public class productcreateDTO {
    private double export_price;
    private  double import_price;
    private String name;
    private String title;
    private String cover;
    private Categorys category;
    private List<ProductSize> productsizes;
    private List<Images> images;

}
