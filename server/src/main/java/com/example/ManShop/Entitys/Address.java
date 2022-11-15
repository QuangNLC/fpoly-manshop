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
    private Long id;

    @ManyToOne
    @JoinColumn(name = "city")
    private Citys city;

    @ManyToOne
    @JoinColumn(name = "district")
    private Districts district;

    @ManyToOne
    @JoinColumn(name = "ward")
    private Wards ward;

    private String location;

    @OneToOne(mappedBy = "address")
    @JsonIgnore
    private Users user;
}
