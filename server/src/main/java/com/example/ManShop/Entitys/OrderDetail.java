package com.example.ManShop.Entitys;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "OrderDetail")
public class OrderDetail {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "totalPrice")
    private double total_price;
    @Column(name = "quantity")
    private int quantity;
    @Column(name = "size")
    private String size;
    @ManyToOne @JoinColumn(name = "product")
    private Product product;
    @JsonIgnore
    @ManyToOne @JoinColumn(name = "orders")
    private Orders orders;



}
