package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.Images;
import com.example.ManShop.Entitys.ProductSize;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Iterator;
import java.util.List;


public interface ProductsizeJPA extends JpaRepository<ProductSize,Integer> {
    //List<ProductSize> findAllById(Iterator<ProductSize> productsizes);
    //  List<Images> findAllById(List<ProductSize> productsizes);
}
