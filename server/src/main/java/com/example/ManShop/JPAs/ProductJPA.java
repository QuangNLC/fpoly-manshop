package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.Product;
import com.example.ManShop.Entitys.ProductSize;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface ProductJPA extends JpaRepository<Product,Integer> {
    Page<Product> findAll(Pageable pageable);
    Page<Product> findByCategory_Id(Pageable pageable,Integer id);


    @Query("select DISTINCT p from Product p join   ProductSize pr on pr.product.id =p.id  join  Sizes s on s.id=pr.size.id where  pr.quantity>0 AND s.id  in :idsize AND p.import_price between :minPrice and :maxPrice ORDER BY p.import_price asc ")
    List<Product> findByListSizeAndAsscPrice(List<Integer> idsize,double minPrice, double maxPrice);
    @Query("select DISTINCT p from Product p join   ProductSize pr on pr.product.id =p.id  join  Sizes s on s.id=pr.size.id where  pr.quantity>0 AND s.id  in :idsize AND p.import_price between :minPrice and :maxPrice ORDER BY p.import_price desc ")
    List<Product> findByListSizeAndDesscPrice(List<Integer> idsize,double minPrice, double maxPrice);
    @Query("select DISTINCT p from Product p join   ProductSize pr on pr.product.id =p.id  join  Sizes s on s.id=pr.size.id where p.category.id =:idcate AND pr.quantity>0 AND s.id  in :idsize AND p.import_price between :minPrice and :maxPrice ORDER BY p.import_price asc ")
    List<Product> findByCategory_IdAndSizeListAndAsscPrice(int idcate, List<Integer> idsize,double minPrice, double maxPrice);
    @Query("select DISTINCT p from Product p join   ProductSize pr on pr.product.id =p.id  join  Sizes s on s.id=pr.size.id where p.category.id =:idcate AND pr.quantity>0 AND s.id  in :idsize AND p.import_price between :minPrice and :maxPrice ORDER BY p.import_price desc ")
    List<Product> findByCategory_IdAndSizeListAndDecccPrice(int idcate, List<Integer> idsize,double minPrice, double maxPrice);












}
