package com.example.ManShop.Entitys;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Users")
public class Users {
    @Id
    private String username;
    @Column(name = "fullname")
    private String fullname;
    @Column(name = "email")
    private String email;
    @Column(name = "photo")
    private String photo;
    @Column(name = "phone")
    private int phone;
    @Column(name = "activated")
    private Boolean activated;
    @Column(name = "verificode", length = 64)
    @JsonIgnore
    private String verificode;

    @OneToMany(mappedBy = "users")
    private List<Role> roles;

    @OneToMany(mappedBy = "users")
    private List<CartItem> cartItems;

    @OneToMany(mappedBy = "user")
    private List<Customers> customers;

    @OneToMany(mappedBy = "users")
    private List<Orders> orders;

     @OneToMany(mappedBy = "users")
    private List<Promotions> promotions;
}
