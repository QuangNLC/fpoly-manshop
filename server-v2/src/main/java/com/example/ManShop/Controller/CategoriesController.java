package com.example.ManShop.Controller;

import com.example.ManShop.Entitys.Categories;
import com.example.ManShop.JPAs.CategoriesJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/category")
public class CategoriesController {
    @Autowired
    private CategoriesJPA categoriesJPA;

    @RequestMapping("/getall")
    public ResponseEntity<List<Categories>> getAll(){
        return ResponseEntity.ok(categoriesJPA.findAll());
    }

    @GetMapping("/details")
    public ResponseEntity<Categories> getCategoryDetails(@PathParam(value = "categoryId") Integer categoryId){
        if(!categoriesJPA.existsById(categoryId)){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(categoriesJPA.findById(categoryId).get());
    }
//    @PreAuthorize("isAuthenticated()")
    @PostMapping("/create")
    public ResponseEntity<?> createCategory(@RequestBody Categories reqCategory){
        Categories newCategory = new Categories();
        newCategory.setTitle(reqCategory.getTitle());
        newCategory.setCreatedAt(new Date());
        newCategory.setIsActive(true);
        try{
            Categories resCategory = categoriesJPA.save(newCategory);
            return ResponseEntity.ok(resCategory);
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.badRequest().build();
        }
    }


    @PutMapping("/update")
    public ResponseEntity<?> updateCategoryDetails(@PathParam("categoryId") Integer categoryId, @RequestBody Categories reqCate){
        if(!categoriesJPA.existsById(categoryId)){
            return ResponseEntity.notFound().build();
        }
        Categories updatedCate = categoriesJPA.findById(categoryId).get();
        updatedCate.setTitle(reqCate.getTitle());
        updatedCate.setIsActive(reqCate.getIsActive());
        Categories resCate = categoriesJPA.save(updatedCate);
        return ResponseEntity.ok(resCate);
    }
    @DeleteMapping()
    public ResponseEntity<?> deleteCategory(@PathParam("categoryId") Integer categoryId){

        if(!categoriesJPA.existsById(categoryId)){
            return ResponseEntity.notFound().build();
        }
        try{
            categoriesJPA.deleteById(categoryId);
            return ResponseEntity.status(200).body("Delete Successfully!");
        }catch (Exception e){
            return  ResponseEntity.status(500).body("Xóa thất bại");
        }

    }

}
