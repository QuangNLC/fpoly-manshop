package com.example.ManShop.Service.impl;

import com.example.ManShop.DTOS.FilterRequestDTO;
import com.example.ManShop.DTOS.PagePaginationResponeDTO;
import com.example.ManShop.JPAs.SizeJPA;
import com.example.ManShop.Service.FilterProductService;
import org.springframework.beans.factory.annotation.Autowired;

public class FilterProductServiceImpl implements FilterProductService {

    @Autowired
    SizeJPA sizeJPA;

    @Override
    public PagePaginationResponeDTO getProductByFilter(FilterRequestDTO filter) {
        return null;
    }
}
