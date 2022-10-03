package com.example.ManShop.Entitys;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "Cart")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne @JoinColumn(name = "product")
    private Product product ;

    @Column(name = "quantity")
    private Double  quantity;
    @ManyToOne @JoinColumn(name = "username")
    private Users  users;
    @ManyToOne @JoinColumn(name = "customer")
    private Customers customers;
}
