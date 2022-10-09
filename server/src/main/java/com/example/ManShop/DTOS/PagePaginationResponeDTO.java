package com.example.ManShop.DTOS;

import com.example.ManShop.Entitys.Product;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.Valid;
import java.util.List;

@Data
@AllArgsConstructor
public class PagePaginationResponeDTO {
    private List<Product> list;
    private Integer limit;
    private Integer currentPage;
    private Integer totalItems;
}
