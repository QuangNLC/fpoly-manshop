package com.example.ManShop.Service;

import com.example.ManShop.DTOS.BillResponse;

import java.util.List;

public interface BillService {
    List<BillResponse> getBill(Integer id);
}
