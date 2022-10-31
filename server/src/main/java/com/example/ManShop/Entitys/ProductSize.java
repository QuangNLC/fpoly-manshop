package com.example.ManShop.Entitys;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

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
    @NotBlank
    private int quantity;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="ProductId")
    private Product product;
    @ManyToOne
    @JoinColumn(name="SizeId")
    private Sizes size;


}
