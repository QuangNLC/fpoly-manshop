package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.Categories;
import com.example.ManShop.Entitys.Materials;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaterialsJPA extends JpaRepository<Materials,Integer> {
}
