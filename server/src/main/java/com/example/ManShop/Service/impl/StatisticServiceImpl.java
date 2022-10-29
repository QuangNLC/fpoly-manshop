package com.example.ManShop.Service.impl;

import com.example.ManShop.Entitys.OrderDetail;
import com.example.ManShop.JPAs.OrderDetailJPA;
import com.example.ManShop.Service.StatisticService;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public class StatisticServiceImpl implements StatisticService {
    private final OrderDetailJPA orderDetailJPA;

    public StatisticServiceImpl(OrderDetailJPA orderDetailJPA) {
        this.orderDetailJPA = orderDetailJPA;
    }

    @Override
    public List<OrderDetail> getOrderDetailByDate(Pageable pageable, Date startDate, Date endDate) {
        return orderDetailJPA.getOrderDetailByDate(pageable, startDate, endDate);
    }
}
