package com.example.ManShop.Entitys;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "Product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "price")
    private double price;
    @Column(name = "createdat")
    private Date createdAt;
    @Column(name = "name", columnDefinition = "NVARCHAR(500)")
    private String name;
    @Column(name = "descTitle", columnDefinition = "NVARCHAR(2500)")
    private String descTitle;
    @ManyToOne @JoinColumn(name="category")
    private Categories category;

    @ManyToOne @JoinColumn(name="material")
    private Materials material;
    @ManyToOne @JoinColumn(name="color")
    private Colors color;

    @OneToMany(mappedBy = "product")
    private List<Images> images;

    @OneToMany(mappedBy = "product")
    private List<ProductSize> productsizes;
}
