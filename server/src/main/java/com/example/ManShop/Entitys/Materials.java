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
@Table(name = "Materials")
public class Materials {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "title",columnDefinition = "NVARCHAR(255)")
    private String title;
    @Column(name = "descriptions", columnDefinition = "NVARCHAR(2500)")
    private String descriptions;

    @JsonIgnore
    @OneToMany(mappedBy = "material")
    private List<Product> products;
}

