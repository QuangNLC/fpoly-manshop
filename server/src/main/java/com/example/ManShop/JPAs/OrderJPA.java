package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.Orders;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderJPA extends JpaRepository<Orders,Integer> {
    Page<Orders> findByUsers_Username(Pageable pageable,String username);

}
