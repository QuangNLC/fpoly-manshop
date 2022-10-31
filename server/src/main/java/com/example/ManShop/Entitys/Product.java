package com.example.ManShop.Entitys;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
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
    @Column(name = "export_price")
    @NotBlank
    private double export_price;
    @Column(name = "import_price")
    @NotBlank
    private  double import_price;
    @Column(name = "created_date")
    @NotBlank
    private Date create_date;
    @Column(name = "update_create")
    @NotBlank
    private Date update_create_date;
    @Column(name = "name", columnDefinition = "NVARCHAR(500)")
    @NotBlank
    private String name;
    @Column(name = "title", columnDefinition = "NVARCHAR(2500)")
    private String title;

    @ManyToOne
    @JoinColumn(name="category")
    private Categorys category;
    @OneToMany(mappedBy = "product")
    private List<ProductSize> productsizes;
    @JsonIgnore
    @OneToMany(mappedBy = "product")
    private List<PromotionProduct> promotions;
    @JsonIgnore
    @OneToMany(mappedBy = "product")
    private List<CartItem> cartItems;
    @OneToMany(mappedBy = "product")
    private List<Images> images;
    @JsonIgnore
    @OneToMany(mappedBy = "product")
    private List<OrderDetail> orderDetail;
}
