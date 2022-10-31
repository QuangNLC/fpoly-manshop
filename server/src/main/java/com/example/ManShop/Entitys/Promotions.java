package com.example.ManShop.Entitys;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Entity
@Table(name = "Promotions")
public class Promotions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "dateAfter")
    @NotBlank
    private Date date_after;
    @Column(name = "dateBefor")
    @NotBlank
    private Date date_befor;
    @Column(name = "title")
    @NotBlank
    private String title;
    @Column(name = "byPrice")
    @NotBlank
    private  double by_price;
    @Column(name = "byPersent")
    @NotBlank
    private int  by_persent;
    @Column(name = "isactive")
    @NotBlank
    private boolean isactive;

    @OneToMany(mappedBy = "promition")
    private List<PromotionProduct> promotionProducts;
    @ManyToOne
    @JoinColumn(name = "username")
    private Users users;
}
