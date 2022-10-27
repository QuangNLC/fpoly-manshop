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
    private String phone;
    @Column(name = "activated")
    private Boolean activated;
    @Column(name="adress")
    private String adress;
    @Column(name = "verificode", length = 64)
    @JsonIgnore
    private String verificode;
    @Column(name = "password")
    @JsonIgnore
    private String password;
    @ManyToOne
    @JoinColumn(name = "role")
    private Role roles;
    @JsonIgnore
    @OneToMany(mappedBy = "users")
    private List<CartItem> cartItems;
    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Customers> customers;
 @JsonIgnore
    @OneToMany(mappedBy = "users")
    private List<Orders> orders;
    @JsonIgnore
     @OneToMany(mappedBy = "users")
    private List<Promotions> promotions;
}
