package com.example.ManShop.DTOS;

import com.example.ManShop.Entitys.Orders;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.List;
@Data
@AllArgsConstructor
public class PageOrderRespone {
    @NotBlank
    private List<Orders> list;
    @NotBlank
    private Integer limit;
    @NotBlank
    private Integer currentPage;
    @NotBlank
    private Integer totalItems;
}

