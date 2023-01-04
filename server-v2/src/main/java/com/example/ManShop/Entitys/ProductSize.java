package com.example.ManShop.Entitys;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Table(name="ProductSize")
public class ProductSize {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "quantity")
    private int quantity;
    @JsonIgnore
    @ManyToOne @JoinColumn(name="productId")
    private Product product;
    @ManyToOne @JoinColumn(name="SizeId")
    private Sizes size;
    @Column(name = "isactive")
    private Boolean isActive;

}
