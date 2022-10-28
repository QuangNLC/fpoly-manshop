package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.PromotionProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductPromotionJPA extends JpaRepository<PromotionProduct,Integer> {
}
