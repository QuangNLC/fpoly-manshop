package com.example.ManShop.Controller;


import com.example.ManShop.JPAs.SizeJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/sizes")
public class SizeController {

    @Autowired
    SizeJPA sizeJPA;

    @GetMapping()
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(sizeJPA.findAll());
    }
}
