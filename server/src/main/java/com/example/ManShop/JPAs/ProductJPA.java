package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface ProductJPA extends JpaRepository<Product,Integer> {
    Page<Product> findAll(Pageable pageable);
    Page<Product> findByCategory_Id(Pageable pageable,Integer id);

    @Query(
            nativeQuery = true,
            value = "\n" +
                    "select * from product pr join categorys c on pr.category = c.id\n" +
                    "\t\t\t\t\t\t\tjoin product_size ps on pr.id = ps.id\n" +
                    "\t\t\t\t\t\t\tjoin sizes s on ps.size_id = s.id\n" +
                    "where s.id = :sizeid and pr.category = :categoryid and (pr.export_price between :minprice and :maxprice)"
    )
    List<Product> findByFilter(
            @Param("sizeid") Integer sizeid,
            @Param("categoryid") Integer categoryid,
            @Param("minprice") Double minprice,
            @Param("maxprice") Double maxprice
    );

}
