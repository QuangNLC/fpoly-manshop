package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.Categories;
import com.example.ManShop.Entitys.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductJPA extends JpaRepository<Product,Integer> {
}
