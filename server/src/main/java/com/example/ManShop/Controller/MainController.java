package com.example.ManShop.Controller;

import com.example.ManShop.Entitys.StatusDetail;
import com.example.ManShop.JPAs.OrderDetailJPA;
import com.example.ManShop.JPAs.OrderDetailStatusJPA;
import com.example.ManShop.JPAs.OrderJPA;
import com.example.ManShop.JPAs.ProductJPA;
import com.example.ManShop.JPAs.ProductsizeJPA;
import com.example.ManShop.JPAs.UserJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;

@RestController
@RequestMapping("main")
public class MainController {
    @Autowired
    OrderDetailJPA orderDetailJPA;
    @Autowired
    UserJPA userJPA;

    @Autowired
    OrderJPA orderJPA;

    @Autowired
    OrderDetailStatusJPA orderDetailStatusJPA;

    final  ProductJPA productJPA;
    final  ProductsizeJPA productsizeJPA;

    public MainController(ProductJPA productJPA, ProductsizeJPA productsizeJPA) {
        this.productJPA = productJPA;
        this.productsizeJPA = productsizeJPA;
    }


@GetMapping("/test")
public ResponseEntity<?> getUserById() {
    return ResponseEntity.ok(userJPA.findById("admin").get());
}
    }


//    @Autowired
//    OrderDetailJPA orderDetailJPA;
//    @Autowired
//    ProductsizeJPA customerJPA;
//
//    final  ProductJPA productJPA;
//    final  ProductsizeJPA productsizeJPA;
//
//    public MainController(ProductJPA productJPA, ProductsizeJPA productsizeJPA) {
//        this.productJPA = productJPA;
//        this.productsizeJPA = productsizeJPA;
//    }
//    @Autowired
//    OrderDetailJPA orderDetailJPA;
//    @Autowired
//    ProductsizeJPA customerJPA;
//
//    final  ProductJPA productJPA;
//    final  ProductsizeJPA productsizeJPA;
//
//    public MainController(ProductJPA productJPA, ProductsizeJPA productsizeJPA) {
//        this.productJPA = productJPA;
//        this.productsizeJPA = productsizeJPA;
//    }




