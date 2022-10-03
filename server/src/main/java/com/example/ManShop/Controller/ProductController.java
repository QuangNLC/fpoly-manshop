package com.example.ManShop.Controller;

import com.example.ManShop.JPAs.ProductJPA;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Entity;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api/product")
public class ProductController {
    private final Logger log = LoggerFactory.getLogger(ProductController.class);
    @Autowired
    ProductJPA productJPA;

    @GetMapping("/getall")
    public ResponseEntity<?> getALL(){
        log.info("gọi vào hàm tìm kiếm tất cả sản phẩm");
        return ResponseEntity.ok(productJPA.findAll());
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getProduct(@PathVariable("id") Integer id){
        if(!productJPA.existsById(id)){
            log.error("không thấy sản phẩm");
            return ResponseEntity.notFound().build();
        }
            log.info("đã tìm thấy sản phẩm với id " +id);
        return ResponseEntity.ok(productJPA.findById(id).get());

    }
    @GetMapping("/{page}/{limit}")
    public ResponseEntity<?> GetByPage(@PathVariable("page") Integer page,@PathVariable("limit")Integer limit){
        System.out.println("goi vao ham phan trang");
        System.out.println("page");
        if(page >0 ){
            Pageable setpage = PageRequest.of(page,limit);
            return ResponseEntity.ok(productJPA.findAll(setpage).stream());
        }else{
            Pageable setpage = PageRequest.of(0,limit);
            return ResponseEntity.ok(productJPA.findAll(setpage).stream());
        }
    }

    @GetMapping("/category/{page}/{limit}")
    public ResponseEntity<?> getbyCategory(@RequestParam Integer categoryid,@PathVariable("page") Integer page,@PathVariable("limit")Integer limit){
        System.out.println("goi vao ham tim kiem theo category");
        System.out.println(categoryid);
        if(page >0 ){
            Pageable setpage = PageRequest.of(page,limit);
            return ResponseEntity.ok(productJPA.findByCategory_Id(setpage,categoryid).stream());
        }else{
            Pageable setpage = PageRequest.of(0,limit);
            return ResponseEntity.ok(productJPA.findByCategory_Id(setpage,categoryid).stream());
        }

    }

}
