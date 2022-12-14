package com.example.ManShop.DTOS;

import com.example.ManShop.Entitys.Customers;
import com.example.ManShop.Entitys.Orders;
import com.example.ManShop.Entitys.Users;
import lombok.Data;

@Data
public class EmailDTO {
    private Users users;
    private Orders orders;
    private Customers customers;


}
