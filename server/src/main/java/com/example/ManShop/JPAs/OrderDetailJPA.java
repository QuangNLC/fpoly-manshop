package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailJPA extends JpaRepository<OrderDetail,Integer> {
}
