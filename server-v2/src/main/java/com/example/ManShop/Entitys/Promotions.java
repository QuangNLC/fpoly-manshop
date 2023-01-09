package com.example.ManShop.Entitys;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
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
    @Column(name = "dateafter")
    private Date dateafter;
    @Column(name = "datebefor")
    private Date datebefor;
    @Column(name = "title", columnDefinition = "NVARCHAR(300)")
    private String title;
    @ManyToOne @JoinColumn(name = "username")
    private Users users;
    @Column(name = "bypersent")
    private int  bypersent;
    @Column(name = "isactive")
    private boolean isactive;
    @Column(name = "isauto")
    private boolean isauto;
    @JsonIgnore
    @OneToMany(mappedBy = "promition")
    private List<PromotionProduct> promotionProducts;


}
