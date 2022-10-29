package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Date;
import java.util.List;

public interface OrderDetailJPA extends JpaRepository<OrderDetail,Integer> {
    @Query(nativeQuery = true, value = """
                select * from order_detail od
                inner join oders o on o.id = od.orders
                inner join product p on p.id = od.product
                inner join customer c on c.id = o.customer
                inner join users u on u.username = c.username
                inner join role r on u.role = r.id
                inner join status_order so on o.id = so.orders
                where o.orderdate between symmetric :#{#startDate} and :#{#endDate}
            """)
    List<OrderDetail> getOrderDetailByDate(Date startDate, Date endDate);
}
