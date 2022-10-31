package com.example.ManShop.Entitys;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.List;

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
    @NotBlank
    private Date createdDate;
    @Column(name = "totalPrice")
    @NotBlank
    private double total_price;
    @Column(name = "orderdate")
    @NotBlank
    private Date order_date;

    @ManyToOne
    @JoinColumn(name = "customer")
    private Customers customers;

    @OneToMany(mappedBy = "orders")
    private List<OrderDetail> orderDetail;

    @ManyToOne
    @JoinColumn(name = "statusOrder")
    private StatusOrder statusOrders;

    @ManyToOne
    @JoinColumn(name = "username")
    private Users users;
}
