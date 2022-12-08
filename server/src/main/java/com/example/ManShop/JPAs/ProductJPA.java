package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.Product;
import com.example.ManShop.Entitys.ProductSize;
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
    @Query("select DISTINCT p from Product p join   ProductSize pr on pr.product.id =p.id  join  Sizes s on s.id=pr.size.id where p.category.id =:idcate AND pr.quantity>0 AND s.id  in :idsize AND p.import_price between :minPrice and :maxPrice and p.name like %:name%")
    List<Product> findByCategory_IdAndSizeList(int idcate, List<Integer> idsize,double minPrice, double maxPrice ,String name,Pageable pageable);

    @Query("select DISTINCT p from Product p join   ProductSize pr on pr.product.id =p.id  join  Sizes s on s.id=pr.size.id where  pr.quantity>0 AND s.id  in :idsize AND p.import_price between :minPrice and :maxPrice and p.name like %:name%")
    List<Product> findByListSize(List<Integer> idsize,double minPrice, double maxPrice,String name,Pageable pageable);

//    @Query("select DISTINCT p from Product p join   ProductSize pr on pr.product.id =p.id  join  Sizes s on s.id=pr.size.id where  pr.quantity>0 AND s.id  in :idsize AND p.import_price between :minPrice and :maxPrice ORDER BY p.import_price asc ")
//    List<Product> findByListSizeAndAsscPrice(List<Integer> idsize,double minPrice, double maxPrice,Pageable pageable);
//    @Query("select DISTINCT p from Product p join   ProductSize pr on pr.product.id =p.id  join  Sizes s on s.id=pr.size.id where  pr.quantity>0 AND s.id  in :idsize AND p.import_price between :minPrice and :maxPrice ORDER BY p.import_price desc ")
//    List<Product> findByListSizeAndDesscPrice(List<Integer> idsize,double minPrice, double maxPrice,Pageable pageable);
//    @Query("select DISTINCT p from Product p join   ProductSize pr on pr.product.id =p.id  join  Sizes s on s.id=pr.size.id where p.category.id =:idcate AND pr.quantity>0 AND s.id  in :idsize AND p.import_price between :minPrice and :maxPrice ORDER BY p.import_price asc ")
//    List<Product> findByCategory_IdAndSizeListAndAsscPrice(int idcate, List<Integer> idsize,double minPrice, double maxPrice,Pageable pageable);
//    @Query("select DISTINCT p from Product p join   ProductSize pr on pr.product.id =p.id  join  Sizes s on s.id=pr.size.id where p.category.id =:idcate AND pr.quantity>0 AND s.id  in :idsize AND p.import_price between :minPrice and :maxPrice ORDER BY p.import_price desc ")
//    List<Product> findByCategory_IdAndSizeListAndDecccPrice(int idcate, List<Integer> idsize,double minPrice, double maxPrice,Pageable pageable);


    @Query(
            nativeQuery = true,
            value = "SELECT  * from Product order by created_date desc"
    )
    List<Product> findNewProducts(Pageable pageable);


    @Query("select   p from Product p where p.id not in (:list)")
    List<Product> findByPromotionActive(List<Integer> list);

    @Query("select DISTINCT  p.id from Product p join PromotionProduct pp on  pp.product.id =p.id join Promotions  pr on pr.id =pp.promition.id where pr.isactive =1")
    List<Integer> findListInteger();

    @Query("select p from Product p where p.id in (:listpr)")
    List<Product> findBylistID(List<Integer> listpr);








}
