package com.example.ManShop.DTOS;

import com.example.ManShop.Entitys.CartItem;
import com.example.ManShop.Entitys.Customers;
import com.example.ManShop.Entitys.Orders;
import com.example.ManShop.Entitys.Promotions;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
public class JwtRespone {
    private String token;
    private String type ="Bearer";
    private String username;
    private List<String> role;
    private String email;
    private String fullname;
    private List<Orders> Orders;
    private int phone;
    private List<Customers> customers;
    private String photo;
    private String verificode;
    private List<CartItem> cartItems;
    private List<Promotions> promotions;
    public JwtRespone(String token, String username, List<String> role, String email, String fullname, List<Orders> orders,List<Customers>customers,String photo,String verificode,List<CartItem>cartItems,List<Promotions>promotions,int phone) {
        this.token = token;
        this.username = username;
        this.role = role;
        this.email = email;
        this.fullname = fullname;
        this.Orders = orders;
        this.phone=phone;
        this.customers = customers;
        this.photo = photo;
        this.verificode=verificode;
        this.cartItems=cartItems;
        this.promotions=promotions;
    }
}
