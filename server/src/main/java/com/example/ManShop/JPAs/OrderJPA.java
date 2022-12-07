package com.example.ManShop.JPAs;

import com.example.ManShop.DTOS.RevenueStatisticsResponeDTO;
import com.example.ManShop.Entitys.Orders;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderJPA extends JpaRepository<Orders,Integer> {

    Page<Orders> findByUsers_Username(Pageable pageable,String username);
//    @Query( "select o from Orders o where o.statusOrders.id in (1,2,3)" )
//    List<Orders> findlistOrderId();
//
//    @Query("Select o from Orders o where o.statusOrders.id in(5)")
//    List<Orders> findWaitingOrders();
@Query(nativeQuery = true)
List<RevenueStatisticsResponeDTO> getTest(Integer yr);

}
