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
        query = "SELECT  distinct (MONTH(orders.createdat)) as month , Sum(orders.totalprice) as turnover  from orders join status_order_detail on status_order_detail.orderid=orders.id join status_order on status_order_detail.statusid= status_order.id where status_order.id =4 and  YEAR(orders.createdat)=:yr  group by (MONTH(orders.createdat))",
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
@Table(name = "Orders")
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "createdat")
    private Date createdAt;
    @Column(name = "updatedat")
    private Date updatedAt;
    @Column(name ="note", columnDefinition = "NVARCHAR(500)")
    private String note;

    //payinfo
    @Column(name= "totalprice")
    private Double totalPrice;
    @Column(name= "discount")
    private Double discount;
    @Column(name= "surcharge") //phụ phí
    private Double surcharge;
    @Column(name= "refund") //hoanf tieen
    private Double refund;
    @Column(name= "shipfee") //phi van chuyen
    private Double shipfee;


    //customerinfo
    @Column(name="fullname", columnDefinition = "NVARCHAR(200)")
    private String fullname;
    @Column(name="phone")
    private String phone;
    @Column(name = "cityname", columnDefinition = "NVARCHAR(200)")
    private String cityName;
    @Column(name = "citycode")
    private int cityCode;
    @Column(name = "districtname", columnDefinition = "NVARCHAR(200)")
    private String districtName;
    @Column(name = "district")
    private int districtCode;
    @Column(name = "wardname", columnDefinition = "NVARCHAR(200)")
    private String wardName;
    @Column(name = "wardcode")
    private String wardCode;
    @Column(name = "location", columnDefinition = "NVARCHAR(500)")
    private String location;
    @Column(name = "ordertype", columnDefinition = "NVARCHAR(100)")
    private String orderType;
    @ManyToOne
    @JoinColumn(name = "orderstatusid")
    private StatusOrder orderStatus;

    @ManyToOne
    @JoinColumn(name = "paymentid")
    private Payment paymenStatus;

//    @JsonIgnore
    @ManyToOne @JoinColumn(name = "username")
    private Users users;

    @OneToMany(mappedBy = "orders")
    private List<OrderDetail> orderDetail;

    @OneToMany(mappedBy = "orders")
    private List<StatusDetail> statusTimelineDetail;

    @OneToMany(mappedBy = "orders")
    private List<PaymentDetail> paymentTimelineDetail;

}
