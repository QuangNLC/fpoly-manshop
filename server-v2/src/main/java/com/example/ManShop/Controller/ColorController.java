package com.example.ManShop.Controller;

import com.example.ManShop.Entitys.Colors;
import com.example.ManShop.Entitys.Materials;
import com.example.ManShop.JPAs.ColorsJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/color")
public class ColorController {

    @Autowired
    private ColorsJPA colorsJPA;

    @RequestMapping("/getall")
    public ResponseEntity<List<Colors>> getAll(){
        return ResponseEntity.ok(colorsJPA.findAll());
    }


    @PostMapping("/create")
    public ResponseEntity<?> createColor(@RequestBody Colors reqColor){
        Colors newColor = new Colors();
        newColor.setColorCode(reqColor.getColorCode());
        newColor.setCreatedAt(new Date());
        newColor.setIsActive(true);
        try{
            Colors resColor = colorsJPA.save(newColor);
            return ResponseEntity.ok(resColor);
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateColorDetails(@PathParam("colorId") Integer colorId, @RequestBody Colors reqColor){
        if(!colorsJPA.existsById(colorId)){
            return ResponseEntity.notFound().build();
        }
        Colors updatedColor = colorsJPA.findById(colorId).get();
        updatedColor.setColorCode(reqColor.getColorCode());
        updatedColor.setIsActive(reqColor.getIsActive());
        Colors resColor = colorsJPA.save(updatedColor);
        return ResponseEntity.ok(resColor);
    }
}
