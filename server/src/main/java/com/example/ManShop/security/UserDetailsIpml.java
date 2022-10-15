package com.example.ManShop.security;

import com.example.ManShop.Entitys.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
public class UserDetailsIpml implements UserDetails {
    private static final long serialVersionUID = 1L;

    private String username;
    private String email;
    private String fullname;
    private Collection<? extends GrantedAuthority> authorities;
    @JsonIgnore
    private  String password;
    private int phone;
    private boolean activated ;
    private List<Orders>orders;
    private List<Customers> customers;
    private String photo;
    private String verificode;
    private List<CartItem> cartItems;
    private List<Promotions> promotions;

//    public UserDetailsIpml(String username, String email,String fullname ,Collection<? extends GrantedAuthority> authorities, String password, int phone, boolean activated) {
//        this.username = username;
//        this.email = email;
//        this.authorities = authorities;
//        this.password = password;
//        this.phone = phone;
//        this.activated = activated;
//        this.fullname - fullname;
//    }
public UserDetailsIpml(String username, String email, String password,String fullname, int phone,
                       Collection<? extends GrantedAuthority> authorities, List<Orders> orders, boolean activated,List<Customers> customers,String photo,String verificode,List<CartItem> cartItems,List<Promotions> promotions) {
    this.fullname = fullname;
    this.username = username;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.authorities = authorities;
    this.orders = orders;
    this.activated = activated;
    this.customers = customers;
    this.photo = photo;
    this.verificode=verificode;
    this.cartItems=cartItems;
    this.promotions=promotions;
}

    public static UserDetailsIpml build(Users user) {
        List<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority(user.getRoles().getRolename()));
        return new UserDetailsIpml(user.getUsername(),user.getEmail(), user.getPassword(),user.getFullname(), user.getPhone(),authorities,user.getOrders(),user.getActivated(),user.getCustomers(), user.getPhoto(), user.getVerificode(), user.getCartItems(),user.getPromotions());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.activated;
    }

}
