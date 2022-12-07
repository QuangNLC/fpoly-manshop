package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.Promotions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface PromotionJPA extends JpaRepository<Promotions,Integer> {
    @Query("select p from Promotions  p where p.date_befor > :date and p.isactive = false and p.isauto =true ")
    List<Promotions> ListFromStartDate(Date date);

    @Query("select p from Promotions  p where p.date_befor < :date and p.isactive = True  ")
    List<Promotions> ListFromEndDate(Date date);
}
