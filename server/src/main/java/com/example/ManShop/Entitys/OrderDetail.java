package com.example.ManShop.Entitys;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "OrderDetail")
public class OrderDetail {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "totalPrice")
    private double total_price;
    @Column(name = "quantity")
    private int quantity;
    @JsonIgnore
    @ManyToOne @JoinColumn(name = "product")
    private Product product;

    @ManyToOne @JoinColumn(name = "orders")
    private Orders orders;




}
