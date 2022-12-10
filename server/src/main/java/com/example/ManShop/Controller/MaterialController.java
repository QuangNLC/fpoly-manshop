package com.example.ManShop.Controller;
import com.example.ManShop.Entitys.Materials;
import com.example.ManShop.JPAs.MaterialJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class  MaterialController {
    @Autowired
    MaterialJPA materialJPA;

    @RequestMapping("/material/getall")
    public ResponseEntity<List<Materials>> getAll(){
        return ResponseEntity.ok(materialJPA.findAll());
    }

    @GetMapping("/material/details")
    public ResponseEntity<Materials> getMaterialDetails(@PathParam(value = "materialId") Integer materialId){
        if(!materialJPA.existsById(materialId)){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(materialJPA.findById(materialId).get());
    }
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/material/create")
    public ResponseEntity<?> createMaterial(@RequestBody Materials reqMaterial){
        Materials newMaterial = new Materials();
        newMaterial.setTitle(reqMaterial.getTitle());
        newMaterial.setDescriptions(reqMaterial.getDescriptions());
        try{
            Materials resMaterial = materialJPA.save(newMaterial);
            return ResponseEntity.ok(resMaterial);
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.badRequest().build();
        }
    }


    @PutMapping("/material/update")
    public ResponseEntity<?> updateMaterialDetails(@PathParam("materialId") Integer materialId, @RequestBody Materials reqMate){
        if(!materialJPA.existsById(materialId)){
            return ResponseEntity.notFound().build();
        }
        Materials updatedMate = materialJPA.findById(materialId).get();
        updatedMate.setTitle(reqMate.getTitle());
        updatedMate.setDescriptions(reqMate.getDescriptions());
        Materials resMate = materialJPA.save(updatedMate);
        return ResponseEntity.ok(resMate);
    }
    @DeleteMapping("/material")
    public ResponseEntity<?> deleteMaterial(@PathParam("materialId") Integer materialId){
        if(!materialJPA.existsById(materialId)){
            return ResponseEntity.notFound().build();
        }
        materialJPA.deleteById(materialId);
        return ResponseEntity.status(200).body("Delete Successfully!");
    }

    //combo


}
