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
@Table(name="PromotiomProduct")
public class PromotionProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne @JoinColumn(name = "promotion")
    private Promotions promition;
    @Column(name = "promotionPrice")
    private  double promotionPrice;
    @JsonIgnore
    @ManyToOne @JoinColumn(name = "product")
    private Product product;
}
