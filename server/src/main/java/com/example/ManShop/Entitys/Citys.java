package com.example.ManShop.Entitys;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor
@Data
@ToString
@AllArgsConstructor
@Table(name="Citys")
public class Citys {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(columnDefinition = "NVARCHAR(255)")
    private String title;
    @OneToMany(mappedBy = "city")
    private List<Districts> districts;
    @OneToMany(mappedBy = "city")
    @JsonIgnore
    private List<Address> city;
}
