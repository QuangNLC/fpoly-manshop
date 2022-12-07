package com.example.ManShop.DTOS;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FilterRequestDTO {
    private Integer categoryId;
    private List<Integer> sizes;
    private Integer sortId;
    private double minPrice;
    private double maxPrice;
    private  String sortname;
    private String name="";
}
