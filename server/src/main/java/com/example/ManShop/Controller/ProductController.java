package com.example.ManShop.Controller;

import com.example.ManShop.DTOS.FilterInfoResponseDTO;
import com.example.ManShop.DTOS.FilterRequestDTO;
import com.example.ManShop.DTOS.productcreateDTO;
import com.example.ManShop.Entitys.Categorys;
import com.example.ManShop.Entitys.Images;
import com.example.ManShop.Entitys.Product;
import com.example.ManShop.Entitys.ProductSize;
import com.example.ManShop.JPAs.SizeJPA;
import com.example.ManShop.JPAs.CategoryJPA;
import com.example.ManShop.JPAs.ImagesJPA;
import com.example.ManShop.JPAs.ProductJPA;
import com.example.ManShop.JPAs.ProductsizeJPA;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.example.ManShop.DTOS.PagePaginationResponeDTO;

import javax.websocket.server.PathParam;

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

    @Autowired
    SizeJPA sizesJPA;

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
        List<Product> resList = productJPA.findAll(setpage).stream().collect(Collectors.toList());
        Integer totalItems = productJPA.findAll().stream().collect(Collectors.toList()).size()%limit == 0 ? productJPA.findAll().stream().collect(Collectors.toList()).size()/limit : productJPA.findAll().stream().collect(Collectors.toList()).size()/limit+1;
        PagePaginationResponeDTO response = new PagePaginationResponeDTO(resList,limit,page,totalItems);
//        return ResponseEntity.ok(productJPA.findAll(setpage).stream());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/get/filter/info")
    public ResponseEntity<FilterInfoResponseDTO> getFilterInfo(){
        log.info("Gọi hàm get thông tin của bộ lọc(filter) trang sản phẩm");
        FilterInfoResponseDTO response = new FilterInfoResponseDTO();
        response.setCategories(categoryJPA.findAll());
        response.setSizes(sizesJPA.findAll());
        response.setMaxPrice(Double.parseDouble("1000000000"));
        return ResponseEntity.ok(response);
    }

    @GetMapping("/weblist")
    public ResponseEntity<?> GetByNiq(@RequestBody(required = false) FilterRequestDTO filter, @PathParam(value = "page") Integer page, @PathParam("limit") Integer limit){

        System.out.println(sizesJPA.findAll().size());
        if(filter == null){
            return ResponseEntity.ok(productJPA.findAll());
        }else{
            Pageable setpage;
            Pageable pagedefalut =PageRequest.of(0,1000000);
            int ix = page -1;
            if(ix >0 ){
                setpage = PageRequest.of(ix, limit);
            }else{
                setpage = PageRequest.of(0, limit);
            }
            List<Product> resList = new ArrayList<>();
            Integer totalItems = 0;
            if(!(filter.getCategoryId() != -1)){


            }else{
                resList = productJPA.findByCategory_Id(setpage,filter.getCategoryId()).stream().collect(Collectors.toList());
                totalItems = productJPA.findByCategory_Id(pagedefalut,filter.getCategoryId()).stream().collect(Collectors.toList()).size()%limit == 0 ? productJPA.findByCategory_Id(pagedefalut,filter.getCategoryId()).stream().collect(Collectors.toList()).size()/limit : productJPA.findByCategory_Id(pagedefalut,filter.getCategoryId()).stream().collect(Collectors.toList()).size()/limit+1;
                PagePaginationResponeDTO response = new PagePaginationResponeDTO(resList,limit,page,totalItems);
                return ResponseEntity.ok(response);
            }

        }

//        Pageable setpage;
//        int ix= page-1;
//        log.info("gọi vào hàm phân trang với số (page)= "+ix +" số phần tử (limit)= "+limit);
//        System.out.println(ix);
//        if(page >0 ){
//            setpage = PageRequest.of(ix, limit);
//        }else{
//            setpage = PageRequest.of(0, limit);
//        }
//        List<Product> resList = productJPA.findAll(setpage).stream().collect(Collectors.toList());
//        Integer totalItems = productJPA.findAll().stream().collect(Collectors.toList()).size()%limit == 0 ? productJPA.findAll().stream().collect(Collectors.toList()).size()/limit : productJPA.findAll().stream().collect(Collectors.toList()).size()/limit+1;
//        PagePaginationResponeDTO response = new PagePaginationResponeDTO(resList,limit,page,totalItems);
//        return ResponseEntity.ok(productJPA.findAll(setpage).stream());
        return ResponseEntity.ok().build();
    }
//    @GetMapping("byfilter")
//    public ResponseEntity<?> byfilter(@RequestParam("") )

    @GetMapping("/category/{page}/{limit}")
    public ResponseEntity<?> getbyCategory(@RequestParam Integer categoryid,@PathVariable("page") Integer page,@PathVariable("limit")Integer limit){
        Pageable setpage;
        Pageable pagedefalut =PageRequest.of(0,1000000);
        int ix = page -1;
        if(ix >0 ){
            setpage = PageRequest.of(ix, limit);
        }else{
            setpage = PageRequest.of(0, limit);
        }
        List<Product> resList = productJPA.findByCategory_Id(setpage,categoryid).stream().collect(Collectors.toList());
        Integer totalItems = productJPA.findByCategory_Id(pagedefalut,categoryid).stream().collect(Collectors.toList()).size()%limit == 0 ? productJPA.findByCategory_Id(pagedefalut,categoryid).stream().collect(Collectors.toList()).size()/limit : productJPA.findByCategory_Id(pagedefalut,categoryid).stream().collect(Collectors.toList()).size()/limit+1;
        PagePaginationResponeDTO response = new PagePaginationResponeDTO(resList,limit,page,totalItems);

//        return ResponseEntity.ok(productJPA.findAll(setpage).stream());
        return ResponseEntity.ok(response);
     //   return ResponseEntity.ok(productJPA.findByCategory_Id(setpage,categoryid).stream());

    }
    @PostMapping("/create")
    public ResponseEntity<?> createProduct(@RequestBody productcreateDTO product) {
        log.info("tạo sản phẩm");
        Categorys category = categoryJPA.findById(product.getCategory().getId()).get();
        Product newproduct = new Product();
        newproduct.setCover(product.getCover());
        newproduct.setCreate_date(new Date());
        newproduct.setExport_price(product.getExport_price());
        newproduct.setImport_price(product.getImport_price());
        newproduct.setName(product.getName());
        newproduct.setTitle(product.getTitle());
        newproduct.setCategory(category);
        Product returnproduct = productJPA.save(newproduct);
        List<ProductSize> ProSizeList = product.getProductsizes();
        ProSizeList.forEach( Size -> {
            Size.setProduct(returnproduct);
            productsizeJPA.save(Size);
        });
        List<Images> imagesList= product.getImages();
        imagesList.forEach(images -> {
            images.setProduct(returnproduct);
            imagesJPA.save(images);
        });
        return ResponseEntity.ok("Tao thanh cong san pham (id)= "+returnproduct.getId());
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
            try {
                productJPA.deleteById(id);
                return "delete product with (id)= "+id;
            }catch (Exception e){
                return ResponseEntity.badRequest().body("xóa không thành công");
            }
        }

    }
}
