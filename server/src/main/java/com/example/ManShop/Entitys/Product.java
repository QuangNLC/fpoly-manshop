package com.example.ManShop.Entitys;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "export_price")
    private double export_price;
    @Column(name = "import_price")
    private  double import_price;
    @Column(name = "created_date")
    private Date create_date;
    @Column(name = "update_create")
    private Date update_create_date;
    @Column(name = "name")
    private String name;
    @Column(name = "title")
    private String title;
    @Column(name = "cover")
    private String cover;


    @JsonIgnore
    @ManyToOne @JoinColumn(name="category")
    private Categorys category;

    @OneToMany(mappedBy = "product")
    private List<ProductSize> productsizes;
    @OneToMany(mappedBy = "product")
    private List<PromotionProduct> promotions;
    @OneToMany(mappedBy = "product")
    private List<CartItem> cartItems;
    @OneToMany(mappedBy = "product")
    private List<Images> images;

    @OneToMany(mappedBy = "product")
    private List<OrderDetail> orderDetail;


}
