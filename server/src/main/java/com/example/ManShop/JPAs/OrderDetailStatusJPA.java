package com.example.ManShop.JPAs;

import com.example.ManShop.DTOS.RPResquestDTO;
import com.example.ManShop.Entitys.StatusDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderDetailStatusJPA extends JpaRepository<StatusDetail,Integer> {

    @Query(value = "select max(status_order_detail.statusid) as st, orderid  from status_order_detail  group by orderid",nativeQuery = true)
    List<Object> getRP();
    @Query( "select  new com.example.ManShop.DTOS.RPResquestDTO(max(s.statusOrder.title) , s.orders.id  )from StatusDetail  s group by s.orders.id")
    List<RPResquestDTO> getRPE();
}
