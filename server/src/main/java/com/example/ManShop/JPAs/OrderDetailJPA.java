package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface OrderDetailJPA extends JpaRepository<OrderDetail,Integer> {
    @Modifying
    @Query("delete from OrderDetail p  where p.orders.id=:id")
    void deletelistOrderdetail(Integer id);
}
