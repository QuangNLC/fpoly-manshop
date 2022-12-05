package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.StatusOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StatusOrderJPA  extends JpaRepository<StatusOrder, Integer> {


    StatusOrder findByTitle(String title);
}
