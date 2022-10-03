package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderJPA extends JpaRepository<Orders,Integer> {
}
