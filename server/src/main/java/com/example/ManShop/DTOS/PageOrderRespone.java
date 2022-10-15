package com.example.ManShop.DTOS;

import com.example.ManShop.Entitys.Orders;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
@Data
@AllArgsConstructor
public class PageOrderRespone {
    private List<Orders> list;
    private Integer limit;
    private Integer currentPage;
    private Integer totalItems;
}

