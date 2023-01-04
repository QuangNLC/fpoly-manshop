package com.example.ManShop.Entitys;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.Nationalized;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@Data
@ToString
@AllArgsConstructor
@Table(name="Categories")
public class Categories {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(columnDefinition = "NVARCHAR(255)")
    private String title;

    @Column(name = "createdat")
    private Date createdAt;
    @Column(name = "isactive")
    private Boolean isActive;

    @JsonIgnore
    @OneToMany(mappedBy = "category")
    private List<Product> products;
}
