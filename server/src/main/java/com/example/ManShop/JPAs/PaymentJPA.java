package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentJPA extends JpaRepository<Payment,Integer> {
    Payment findByTitle(String title);
}
