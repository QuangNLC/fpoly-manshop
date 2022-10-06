package com.example.ManShop.Controller;

import com.example.ManShop.JPAs.CustomerJPA;
import com.example.ManShop.JPAs.OrderDetailJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("main")
public class MainController {
    @Autowired
    OrderDetailJPA orderDetailJPA;
    @Autowired
    CustomerJPA customerJPA;
    @GetMapping("/test")
    public ResponseEntity<?> Test(){
        System.out.println("test");
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("uuuu/MM/dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        System.out.println(dtf.format(now));
        return  ResponseEntity.ok(customerJPA.findAll());
    }


}
