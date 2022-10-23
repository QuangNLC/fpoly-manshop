package com.example.ManShop.Entitys;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
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
    @JsonIgnore
    @OneToMany(mappedBy = "customers")
    private List<Orders> order;
    @JsonIgnore
    @OneToMany(mappedBy = "customers")
    private List<CartItem> cartItems;


}
