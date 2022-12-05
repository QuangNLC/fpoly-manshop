package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.StatusDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailStatusJPA extends JpaRepository<StatusDetail,Integer> {
}
