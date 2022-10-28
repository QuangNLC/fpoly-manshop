package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.Promotions;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PromotionJPA extends JpaRepository<Promotions,Integer> {
}
