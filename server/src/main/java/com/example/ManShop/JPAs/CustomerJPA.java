package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.Customers;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerJPA extends JpaRepository<Customers,Integer> {
}
