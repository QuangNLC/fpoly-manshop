package com.example.ManShop.Service.impl;

import com.example.ManShop.DTOS.BillResponse;
import com.example.ManShop.JPAs.OrderDetailJPA;
import com.example.ManShop.Service.BillService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BillServiceImpl implements BillService {
    private final OrderDetailJPA orderDetailJPA;

    public BillServiceImpl(OrderDetailJPA orderDetailJPA) {
        this.orderDetailJPA = orderDetailJPA;
    }

    @Override
    public List<BillResponse> getBill(Integer id) {
        return orderDetailJPA.getBillById(id);
    }
}
