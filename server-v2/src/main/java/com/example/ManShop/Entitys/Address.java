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
@Table(name = "Address")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "name", columnDefinition = "NVARCHAR(100)")
    private String name;
    @Column(name="phone")
    private String phone;
    @Column(name = "cityname", columnDefinition = "NVARCHAR(200)")
    private String cityName;
    @Column(name = "citycode")
    private int cityCode;
    @Column(name = "districtname", columnDefinition = "NVARCHAR(200)")
    private String districtName;
    @Column(name = "district")
    private int districtCode;
    @Column(name = "wardname", columnDefinition = "NVARCHAR(200)")
    private String wardName;
    @Column(name = "wardcode")
    private String wardCode;
    @Column(name = "location", columnDefinition = "NVARCHAR(500)")
    private String location;

    @Column(name = "isdefault")
    private Boolean isDefault;
    @ManyToOne
    @JoinColumn(name = "addressid")
    @JsonIgnore
    private Users user;
}
