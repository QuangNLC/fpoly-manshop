package com.example.ManShop.Controller;
import com.example.ManShop.Entitys.Categorys;
import com.example.ManShop.JPAs.CategoryJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
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

    @GetMapping("/details")
    public ResponseEntity<Categorys> getCategoryDetails(@PathParam(value = "categoryId") Integer categoryId){
            if(!categoryJPA.existsById(categoryId)){
                return ResponseEntity.notFound().build();
            }
        return ResponseEntity.ok(categoryJPA.findById(categoryId).get());
    }

    @PostMapping("/create")
    public ResponseEntity<?> createCategory(@RequestBody Categorys reqCategory){
        Categorys newCategory = new Categorys();
        newCategory.setTitle(reqCategory.getTitle());

        try{
            Categorys resCategory = categoryJPA.save(newCategory);
            return ResponseEntity.ok(resCategory);
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.badRequest().build();
        }
    }


    @PutMapping("/update")
    public ResponseEntity<?> updateCategoryDetails(@PathParam("categoryId") Integer categoryId, @RequestBody Categorys reqCate){
        if(!categoryJPA.existsById(categoryId)){
            return ResponseEntity.notFound().build();
        }

        Categorys updatedCate = categoryJPA.findById(categoryId).get();
        updatedCate.setTitle(reqCate.getTitle());

        Categorys resCate = categoryJPA.save(updatedCate);

        return ResponseEntity.ok(resCate);
    }

    @DeleteMapping()
    public ResponseEntity<?> deleteCategory(@PathParam("categoryId") Integer categoryId){
        if(!categoryJPA.existsById(categoryId)){
            return ResponseEntity.notFound().build();
        }
        categoryJPA.deleteById(categoryId);
        return ResponseEntity.status(200).body("Delete Successfully!");
    }
}
