package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.Combo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComboJPA extends JpaRepository<Combo,Integer> {
    Combo findByTitle(String title);
}
