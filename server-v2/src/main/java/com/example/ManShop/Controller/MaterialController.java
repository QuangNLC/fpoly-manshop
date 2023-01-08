package com.example.ManShop.Controller;

import com.example.ManShop.Entitys.Categories;
import com.example.ManShop.Entitys.Materials;
import com.example.ManShop.JPAs.MaterialsJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/material")
public class MaterialController {

    @Autowired
    private MaterialsJPA materialsJPA;


    @RequestMapping("/getall")
    public ResponseEntity<List<Materials>> getAll(){
        return ResponseEntity.ok(materialsJPA.findAll());
    }

    @PostMapping("/create")
    public ResponseEntity<?> createMaterial(@RequestBody Materials reqMaterial){
        Materials newMaterial = new Materials();
        newMaterial.setTitle(reqMaterial.getTitle());
        newMaterial.setCreatedAt(new Date());
        newMaterial.setIsActive(true);
        newMaterial.setDescriptions(reqMaterial.getDescriptions());
        try{
            Materials resMaterial = materialsJPA.save(newMaterial);
            return ResponseEntity.ok(resMaterial);
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateMaterialDetails(@PathParam("materialId") Integer materialId, @RequestBody Materials reqMaterial){
        if(!materialsJPA.existsById(materialId)){
            return ResponseEntity.notFound().build();
        }
        Materials updatedMate = materialsJPA.findById(materialId).get();
        updatedMate.setTitle(reqMaterial.getTitle());
        updatedMate.setIsActive(reqMaterial.getIsActive());
        updatedMate.setDescriptions(reqMaterial.getDescriptions());
        Materials resMate = materialsJPA.save(updatedMate);
        return ResponseEntity.ok(resMate);
    }

}
