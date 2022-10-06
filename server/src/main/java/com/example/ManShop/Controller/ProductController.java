package com.example.ManShop.Controller;

import com.example.ManShop.Entitys.Categorys;
import com.example.ManShop.Entitys.Images;
import com.example.ManShop.Entitys.Product;
import com.example.ManShop.Entitys.ProductSize;
import com.example.ManShop.JPAs.CategoryJPA;
import com.example.ManShop.JPAs.ImagesJPA;
import com.example.ManShop.JPAs.ProductJPA;
import com.example.ManShop.JPAs.ProductsizeJPA;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/api/product")
public class ProductController {
    private final Logger log = LoggerFactory.getLogger(ProductController.class);
    final
    ProductJPA productJPA;

    final
    CategoryJPA categoryJPA;

    final
    ImagesJPA imagesJPA;

    final
    ProductsizeJPA productsizeJPA;

    public ProductController(ProductJPA productJPA, CategoryJPA categoryJPA, ImagesJPA imagesJPA, ProductsizeJPA productsizeJPA) {
        this.productJPA = productJPA;
        this.categoryJPA = categoryJPA;
        this.imagesJPA = imagesJPA;
        this.productsizeJPA = productsizeJPA;
    }


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
        Pageable setpage;
        int ix= page-1;
        log.info("gọi vào hàm phân trang với số (page)= "+ix +" số phần tử (limit)= "+limit);
        System.out.println(ix);
        if(page >0 ){
            setpage = PageRequest.of(ix, limit);
        }else{
            setpage = PageRequest.of(0, limit);
        }
        return ResponseEntity.ok(productJPA.findAll(setpage).stream());
    }

    @GetMapping("/category/{page}/{limit}")
    public ResponseEntity<?> getbyCategory(@RequestParam Integer categoryid,@PathVariable("page") Integer page,@PathVariable("limit")Integer limit){
        Pageable setpage;
        int ix = page -1;
        if(ix >0 ){
            setpage = PageRequest.of(ix, limit);
        }else{
            setpage = PageRequest.of(0, limit);
        }
        return ResponseEntity.ok(productJPA.findByCategory_Id(setpage,categoryid).stream());

    }
    @PostMapping("/create")
    public Product createProduct(@RequestBody Product product) {
        log.info("tạo sản phẩm");
        Categorys category = categoryJPA.findById(product.getCategory().getId()).get();
       List<Images> listimages = imagesJPA.findAllById(product.getImages());
       System.out.println(listimages);
        //List<ProductSize> Listsize = productsizeJPA.findAllById(product.getProductsizes());
        //product.setImages(listimages);
        product.setCategory(category);
       // product.setProductsizes(Listsize);
        productJPA.save(product);
        return(product);
    }
    @PutMapping("/update/{id}")
    public Product updateProduct(@PathVariable("id") Integer id, @RequestBody Product product) {
        Categorys category = categoryJPA.findById(product.getCategory().getId()).get();
        System.out.println(product.getImages());
        List<Images> listimages = imagesJPA.findAllById(product.getImages());
        System.out.println(listimages);
//        Product product1 = new Product();
//        productJPA.save(product);
//        listimages.forEach(img -> {
//            img.setProduct(product1);
//            imagesJPA.save(img);
//        });
        //List<ProductSize> Listsize = productsizeJPA.findAllById(product.getProductsizes());
        product.setCategory(category);
        product.setImages(product.getImages());
        product.setId(id);
        //

        return product;
    }


    @DeleteMapping("/delete/{id}")
    public Object deleteProduct(@PathVariable("id") Integer id) {
        log.info("gọi vào hàm xóa sản phẩm với (id)= "+id);
        if(!productJPA.existsById(id)){
            return "not found product with (id)=" +id;
        }else {
            productJPA.deleteById(id);
            return "delete product with (id)= "+id;
        }

    }
}
