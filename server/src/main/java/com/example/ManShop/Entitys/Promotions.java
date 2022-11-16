package com.example.ManShop.Entitys;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
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
    private Date date_after;
    @Column(name = "dateBefor")
    private Date date_befor;
    @Column(name = "title")
    private String title;
    @ManyToOne @JoinColumn(name = "username")
    private Users users;
    @Column(name = "byPrice")
    private  double by_price;
    @Column(name = "byPersent")
    private int  by_persent;
    @Column(name = "isactive")
    private boolean isactive;
    @JsonIgnore
    @OneToMany(mappedBy = "promition")
    private List<PromotionProduct> promotionProducts;


}
