package com.example.ManShop.DTOS;

import com.example.ManShop.Entitys.Product;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Data
@AllArgsConstructor
public class PagePaginationResponeDTO {
    @NotBlank
    private List<Product> list;
    @NotBlank
    private Integer limit;
    @NotBlank
    private Integer currentPage;
    @NotBlank
    private Integer totalItems;
}
