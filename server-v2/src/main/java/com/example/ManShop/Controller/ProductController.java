package com.example.ManShop.Controller;

import com.example.ManShop.DTOS.FilterInfoResponseDTO;
import com.example.ManShop.JPAs.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/product")
public class ProductController {
    private final Logger log = LoggerFactory.getLogger(ProductController.class);
    @Autowired
    private ProductJPA productJPA;

    @Autowired
    private CategoriesJPA categoriesJPA;

    @Autowired
    private SizesJPA sizesJPA;

    @Autowired
    private ColorsJPA colorsJPA;

    @Autowired
    private MaterialsJPA materialsJPA;

    @GetMapping("/getall")
    public ResponseEntity<?> getALL(){
        log.info("gọi vào hàm tìm kiếm tất cả sản phẩm");
        return ResponseEntity.ok(productJPA.findAll());
    }

    @GetMapping("/get/filter/info")
    public ResponseEntity<FilterInfoResponseDTO> getFilterInfo(){
        log.info("Gọi hàm get thông tin của bộ lọc(filter) trang sản phẩm");
        FilterInfoResponseDTO response = new FilterInfoResponseDTO();
        response.setCategories(categoriesJPA.findAll());
        response.setSizes(sizesJPA.findAll());
        response.setColors(colorsJPA.findAll());
        response.setMaterials(materialsJPA.findAll());
        return ResponseEntity.ok(response);
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
}
