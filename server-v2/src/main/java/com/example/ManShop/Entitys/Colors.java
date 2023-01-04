package com.example.ManShop.Entitys;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@Data
@ToString
@AllArgsConstructor
@Table(name = "Colors")
public class Colors {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "colorcode",columnDefinition = "NVARCHAR(255)")
    private String colorCode;
    @Column(name = "createdat")
    private Date createdAt;
    @Column(name = "isactive")
    private Boolean isActive;

    @JsonIgnore
    @OneToMany(mappedBy = "color")
    private List<Product> products;
}
