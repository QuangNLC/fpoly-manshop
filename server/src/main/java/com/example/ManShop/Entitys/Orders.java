package com.example.ManShop.Entitys;

import com.example.ManShop.DTOS.RevenueStatisticsResponeDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
@NamedNativeQuery(name = "Orders.getTest",
        query = "SELECT  distinct (MONTH(oders.orderdate)) as month , Sum(oders.total_price) as turnover  from oders join status_order_detail on status_order_detail.orderid=oders.id join status_order on status_order_detail.statusid= status_order.id where status_order.id =4 and  YEAR(oders.orderdate)=:yr  group by (MONTH(oders.orderdate))",
        resultSetMapping = "Mapping.RevenueStatisticsResponeDTO")
@SqlResultSetMapping(name = "Mapping.RevenueStatisticsResponeDTO",
        classes = @ConstructorResult(targetClass = RevenueStatisticsResponeDTO.class,
                columns = {@ColumnResult(name = "month"),
                        @ColumnResult(name = "turnover")}))

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "Oders")
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "createDate")
    private Date createdDate;
    @JsonIgnore
    @ManyToOne @JoinColumn(name = "username")
    private Users users;

    @Column(name = "totalPrice")
    private double total_price;
    @Column(name = "orderdate")
    private Date order_date;

    @ManyToOne @JoinColumn(name = "customer")
    private Customers customers;

    @Column(name = "ReducePrice")
    private double reduce_price;

    @OneToMany(mappedBy = "orders")
    private List<OrderDetail> orderDetail;

//    @ManyToOne
//    @JsonIgnore
//    @JoinColumn(name = "statusOrder")
//    private StatusOrder statusOrders;

    @OneToMany(mappedBy = "orders")
    private List<OrderPayment> orderPayment;

    @OneToMany(mappedBy = "orders")
    private List<StatusDetail> statusDetail;

}
