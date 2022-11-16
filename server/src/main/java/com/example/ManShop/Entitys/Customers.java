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
@AllArgsConstructor
@ToString
@Table(name = "Customer")
public class Customers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "phone")
    private int phone;
    @Column(name = "name", columnDefinition = "NVARCHAR(200)")
    private String name;
    @Column(name = "note", columnDefinition = "NVARCHAR(2500)")
    private String note;
    @ManyToOne @JoinColumn(name = "username")
    private Users user;
    @JsonIgnore
    @OneToMany(mappedBy = "customers")
    private List<Orders> order;
    @JsonIgnore
    @OneToMany(mappedBy = "customers")
    private List<CartItem> cartItems;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address", referencedColumnName = "id")
    private Address address;


}
