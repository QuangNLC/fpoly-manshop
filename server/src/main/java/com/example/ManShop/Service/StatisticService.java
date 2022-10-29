package com.example.ManShop.Service;

import com.example.ManShop.Entitys.OrderDetail;

import java.sql.Date;
import java.util.List;

public interface StatisticService {
    List<OrderDetail> getOrderDetailByDate(Date startDate, Date endDate);
}
