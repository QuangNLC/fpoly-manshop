package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.OrderPayment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderPaymentJPA extends JpaRepository<OrderPayment,Integer> {
}
