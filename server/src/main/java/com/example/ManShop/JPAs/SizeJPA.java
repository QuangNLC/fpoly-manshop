package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.Sizes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SizeJPA  extends JpaRepository<Sizes, Integer> {

    Sizes findByTitle(String title);


}
