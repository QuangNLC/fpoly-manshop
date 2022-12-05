package com.example.ManShop.Controller;

import com.example.ManShop.Entitys.StatusDetail;
import com.example.ManShop.JPAs.OrderDetailJPA;
import com.example.ManShop.JPAs.OrderDetailStatusJPA;
import com.example.ManShop.JPAs.OrderJPA;
import com.example.ManShop.JPAs.ProductJPA;
import com.example.ManShop.JPAs.ProductsizeJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("main")
public class MainController {
    @Autowired
    OrderDetailJPA orderDetailJPA;
    @Autowired
    ProductsizeJPA customerJPA;

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
    public ResponseEntity<?> test() {
   // StatusDetail a = orderDetailStatusJPA.findById(2).get();
    return ResponseEntity.ok(orderJPA.findById(25));
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




