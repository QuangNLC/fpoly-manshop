package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.Colors;
import com.example.ManShop.Entitys.Images;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;

public interface ImagesJPA extends JpaRepository<Images,Integer> {

    @Modifying
    @Transactional
    @Query(
        nativeQuery = true,
        value = "update images set isdefault = 0 where product = :productId"
    )
    int setAllImgNotDefault(Integer productId);
}
