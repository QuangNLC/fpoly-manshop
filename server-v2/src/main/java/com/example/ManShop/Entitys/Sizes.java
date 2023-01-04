package com.example.ManShop.Entitys;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@ToString
@AllArgsConstructor
public class Sizes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "title")
    private String title;
    @JsonIgnore
    @OneToMany(mappedBy = "size")
    private List<ProductSize> productSize;
}
