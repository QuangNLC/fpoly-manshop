package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.OrderDetail;
import com.example.ManShop.Entitys.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrdersJPA extends JpaRepository<Orders,Integer> {
}
