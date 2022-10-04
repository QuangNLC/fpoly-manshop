package com.example.ManShop.Controller;

import com.example.ManShop.Entitys.Users;
import com.example.ManShop.JPAs.CustomerJPA;
import com.example.ManShop.JPAs.OrderDetailJPA;
import com.example.ManShop.JPAs.OrderJPA;
import com.example.ManShop.JPAs.UserJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/order")
public class OrderContoller {

    @Autowired
    UserJPA userJPA;
    @Autowired
    CustomerJPA customerJPA;
    @Autowired
    OrderDetailJPA orderDetailJPA;
    @Autowired
    OrderJPA orderJPA;


    @GetMapping("/all")
    public ResponseEntity<?> getall(){
        return null;
    }


}
