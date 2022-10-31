package com.example.ManShop.Service;

import com.example.ManShop.Entitys.OrderDetail;
import org.springframework.data.domain.Pageable;

import java.sql.Date;
import java.util.List;

public interface OrderDetailService {
    List<OrderDetail> getOrderDetailByDate(Pageable pageable, Date startDate, Date endDate);

    List<OrderDetail> getOrderDetailByDateAndUsername(Pageable pageable, String username, Date startDate, Date endDate);
}
