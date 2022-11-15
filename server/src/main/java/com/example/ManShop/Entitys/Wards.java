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
@Table(name="Wards")
public class Wards {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "NVARCHAR(255)")
    private String title;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "district")
    private Districts district;

    @OneToMany(mappedBy = "ward")
    @JsonIgnore
    private List<Address> adressList;

}
