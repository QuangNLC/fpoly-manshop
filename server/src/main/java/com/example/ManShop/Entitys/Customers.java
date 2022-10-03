package com.example.ManShop.Entitys;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Customer")
public class Customers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "phone")
    private int phone;
    @Column(name = "address")
    private String address;
    @Column(name = "customerInfor")
    private String customerInfor;
    @ManyToOne @JoinColumn(name = "username")
    private Users user;

    @OneToMany(mappedBy = "customers")
    private List<Orders> order;
    @OneToMany(mappedBy = "customers")
    private List<CartItem> cartItems;


}
