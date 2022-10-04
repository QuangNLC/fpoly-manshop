package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.Categorys;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryJPA extends JpaRepository<Categorys,Integer> {

}
