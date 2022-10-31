package com.example.ManShop.DTOS;

import com.example.ManShop.Entitys.*;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Data
public class productcreateDTO {
    @NotBlank(message = "không được để trống thông tin")
    private double export_price;
    @NotBlank(message = "không được để trống thông tin")
    private double import_price;
    @NotBlank(message = "không được để trống thông tin")
    private String name;
    @NotBlank(message = "không được để trống thông tin")
    private String title;
    private String cover;
    private Categorys category;
    private List<ProductSize> productsizes;
    private List<Images> images;
}
