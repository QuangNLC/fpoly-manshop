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
@Table(name="Districts")
public class Districts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(columnDefinition = "NVARCHAR(255)")
    private String title;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "city")
    private Citys city;
    @OneToMany(mappedBy = "district")
    private List<Wards> wards;
    @OneToMany(mappedBy = "district")
    @JsonIgnore
    private List<Address> adressList;

}
