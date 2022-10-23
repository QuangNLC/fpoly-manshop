package com.example.ManShop.Controller;

import com.example.ManShop.DTOS.FilterRequestDTO;
import com.example.ManShop.Entitys.Product;
import com.example.ManShop.Entitys.ProductSize;
import com.example.ManShop.JPAs.OrderDetailJPA;
import com.example.ManShop.JPAs.ProductJPA;
import com.example.ManShop.JPAs.ProductsizeJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("main")
public class MainController {
    @Autowired
    OrderDetailJPA orderDetailJPA;
    @Autowired
    ProductsizeJPA customerJPA;

    final  ProductJPA productJPA;
    final  ProductsizeJPA productsizeJPA;

    public MainController(ProductJPA productJPA, ProductsizeJPA productsizeJPA) {
        this.productJPA = productJPA;
        this.productsizeJPA = productsizeJPA;
    }



    }




