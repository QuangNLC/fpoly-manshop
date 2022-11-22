package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.OrderNoti;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface OrderNotiJPA extends JpaRepository<OrderNoti, Long> {

    @Query(value = "SELECT count(n) from OrderNoti n where n.status = false")
    public Long getUnseenNotiCount();


    @Modifying
    @Transactional
    @Query(
            value = "update OrderNoti n  set n.status = true")
    int seenNotiByAdm();
}
