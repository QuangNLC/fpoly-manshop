package com.example.ManShop.Controller;
import com.example.ManShop.Entitys.Categorys;
import com.example.ManShop.JPAs.CategoryJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    CategoryJPA categoryJPA;

    @RequestMapping("/getall")
    public ResponseEntity<List<Categorys>> getAll(){
        return ResponseEntity.ok(categoryJPA.findAll());
    }
}
