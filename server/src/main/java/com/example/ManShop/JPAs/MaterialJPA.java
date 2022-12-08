package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.Materials;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaterialJPA extends JpaRepository<Materials,Integer> {
}
