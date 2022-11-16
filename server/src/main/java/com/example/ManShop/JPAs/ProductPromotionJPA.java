package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.PromotionProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductPromotionJPA extends JpaRepository<PromotionProduct,Integer> {
    @Query("select  p from PromotionProduct p where p.promition.id=:id")
    List<PromotionProduct> findPromotionPro(Integer id);

}
