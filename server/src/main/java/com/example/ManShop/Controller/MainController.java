package com.example.ManShop.Controller;

import com.example.ManShop.Entitys.ProductSize;
import com.example.ManShop.JPAs.OrderDetailJPA;
import com.example.ManShop.JPAs.ProductsizeJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("main")
public class MainController {
    @Autowired
    OrderDetailJPA orderDetailJPA;
    @Autowired
    ProductsizeJPA customerJPA;
    @GetMapping("/test")
    public ProductSize Test(){
        ProductSize abc = customerJPA.findBySize_IdAndProduct_Id(1,1);
        return  abc;
        }

    }



