package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.Categories;
import com.example.ManShop.Entitys.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface OrderDetailJPA extends JpaRepository<OrderDetail,Integer> {
    @Modifying
    @Query("delete from OrderDetail p  where p.orders.id=:id")
    void deletelistOrderdetail(Integer id);

    @Query(value = "select sum(order_detail.quantity) from  order_detail  join orders on orders.id= order_detail.orders join status_order_detail on orders.id =status_order_detail.orderid where status_order_detail.statusid=4 and orders.createdat like :date%",nativeQuery = true)
    Integer getsll(String date);
}
