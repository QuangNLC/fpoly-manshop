package com.example.ManShop.DTOS;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FilterRequestDTO {
    @NotBlank(message = "không được để trống thông tin")
    private Integer categoryId;
    private List<Integer> sizes;
    @NotBlank(message = "không được để trống thông tin")
    private double minPrice;
    @NotBlank(message = "không được để trống thông tin")
    private double maxPrice;
    @NotBlank(message = "không được để trống thông tin")
    private String sortname;
}
