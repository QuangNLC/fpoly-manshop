package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.Product;
import com.example.ManShop.Entitys.Sizes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SizeJPA  extends JpaRepository<Sizes, Integer> {

    Sizes findByTitle(String title);

}
