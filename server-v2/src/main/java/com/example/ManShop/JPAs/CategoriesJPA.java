package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.Categories;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriesJPA extends JpaRepository<Categories,Integer> {
}
