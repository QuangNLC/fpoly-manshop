package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.Role;
import com.example.ManShop.Entitys.Sizes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SizesJPA extends JpaRepository<Sizes,Integer> {
    Sizes findByTitle(String title);
}
