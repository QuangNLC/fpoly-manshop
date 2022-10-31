package com.example.ManShop.Entitys;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "OrderDetail")
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "totalPrice")
    @NotBlank
    private double total_price;
    @Column(name = "quantity")
    @NotBlank
    private int quantity;
    @Column(name = "size")
    @NotBlank
    private String size;
    @ManyToOne
    @JoinColumn(name = "product")
    private Product product;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "orders")
    private Orders orders;




}
