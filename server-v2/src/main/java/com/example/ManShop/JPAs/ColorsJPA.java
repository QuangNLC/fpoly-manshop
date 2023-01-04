package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.Categories;
import com.example.ManShop.Entitys.Colors;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ColorsJPA extends JpaRepository<Colors,Integer> {
}
