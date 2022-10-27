package com.example.ManShop.Controller;


import com.example.ManShop.Entitys.Sizes;
import com.example.ManShop.JPAs.SizeJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/sizes")
public class SizeController {

    @Autowired
    SizeJPA sizeJPA;
    @PostMapping("/create")
    public ResponseEntity<?> createSize(@RequestBody Sizes s){
        if(!sizeJPA.existsByTitle(s.getTitle())){
            return ResponseEntity.status(403).body("Size da ton toi");
        }
        sizeJPA.save(s);
        return ResponseEntity.ok().body(s);
    }
    @GetMapping()
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(sizeJPA.findAll());
    }
}
