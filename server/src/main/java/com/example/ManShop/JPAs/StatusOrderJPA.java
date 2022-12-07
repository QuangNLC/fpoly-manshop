package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.StatusOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StatusOrderJPA  extends JpaRepository<StatusOrder, Integer> {


    StatusOrder findByTitle(String title);

    @Query("select s.id from StatusOrder s join StatusDetail ss on ss.statusOrder.id =s.id join Orders  o on o.id=ss.orders.id where o.id=:id")
    List<Integer> findAllStatusInOrder(Integer id);


}
