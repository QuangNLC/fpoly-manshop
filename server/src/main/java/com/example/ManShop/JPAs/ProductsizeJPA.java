package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.Images;
import com.example.ManShop.Entitys.ProductSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Iterator;
import java.util.List;


public interface ProductsizeJPA extends JpaRepository<ProductSize,Integer> {
    ProductSize findBySize_Title(String title);
    @Query("select  p from ProductSize  p where  p.size.id=:a and  p.product.id=:b")
    ProductSize findBySize_IdAndProduct_Id(int a, int b);

    @Modifying
    @Query("delete from ProductSize p  where p.product.id=:id")
    void deletelist(Integer id);

}
