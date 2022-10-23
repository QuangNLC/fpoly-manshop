package com.example.ManShop.Service;

import com.example.ManShop.DTOS.FilterRequestDTO;
import com.example.ManShop.DTOS.PagePaginationResponeDTO;

public interface FilterProductService {

    PagePaginationResponeDTO getProductByFilter(FilterRequestDTO filter);
}
