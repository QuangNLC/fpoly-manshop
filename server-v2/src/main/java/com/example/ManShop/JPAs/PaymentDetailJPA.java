package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.PaymentDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentDetailJPA extends JpaRepository<PaymentDetail, Integer> {
}
