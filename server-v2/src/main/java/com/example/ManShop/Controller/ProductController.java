package com.example.ManShop.Controller;

import com.example.ManShop.DTOS.*;
import com.example.ManShop.Entitys.Categories;
import com.example.ManShop.Entitys.Images;
import com.example.ManShop.Entitys.Product;
import com.example.ManShop.Entitys.ProductSize;
import com.example.ManShop.JPAs.*;
import com.example.ManShop.Service.FileService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.websocket.server.PathParam;
import java.util.Date;
import java.util.List;

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

    @Autowired
    private ProductSizeJPA productSizeJPA;

    @Autowired
    private FileService fileService;

    @Autowired
    private ImagesJPA imagesJPA;

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


    @PostMapping("/create")
    public ResponseEntity<?> createProduct(@RequestBody CreateProductRequestDTO requestDTO) {
        if(!categoriesJPA.existsById(requestDTO.getCategoryId())){
            return ResponseEntity.badRequest().body("Không tìm thấy thể loại với id: "+requestDTO.getCategoryId());
        }else if(!materialsJPA.existsById(requestDTO.getMaterialId())){
            return ResponseEntity.badRequest().body("Không tìm thấy chất liệu với id: "+requestDTO.getMaterialId());
        }else if(!colorsJPA.existsById(requestDTO.getColorId())){
            return ResponseEntity.badRequest().body("Không tìm thấy màu với id: "+requestDTO.getColorId());
        }

        Product newProduct = new Product();
        newProduct.setName(requestDTO.getName());
        newProduct.setDescTitle(requestDTO.getDescription());
        newProduct.setPrice(requestDTO.getPrice());
        newProduct.setCreatedAt(new Date());
        newProduct.setIsActive(true);
        newProduct.setCategory(categoriesJPA.findById(requestDTO.getCategoryId()).get());
        newProduct.setMaterial(materialsJPA.findById(requestDTO.getMaterialId()).get());
        newProduct.setColor(colorsJPA.findById(requestDTO.getColorId()).get());

        Product resProduct = productJPA.save(newProduct);

        log.info("tạo sản phẩm id: "+ resProduct.getId());

        return ResponseEntity.ok(resProduct.getId());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> createProduct(@PathVariable("id") Integer id, @RequestBody CreateProductRequestDTO requestDTO) {
        if(!categoriesJPA.existsById(requestDTO.getCategoryId())){
            return ResponseEntity.badRequest().body("Không tìm thấy thể loại với id: "+requestDTO.getCategoryId());
        }else if(!materialsJPA.existsById(requestDTO.getMaterialId())){
            return ResponseEntity.badRequest().body("Không tìm thấy chất liệu với id: "+requestDTO.getMaterialId());
        }else if(!colorsJPA.existsById(requestDTO.getColorId())){
            return ResponseEntity.badRequest().body("Không tìm thấy màu với id: "+requestDTO.getColorId());
        }

        Product newProduct = productJPA.findById(id).get();
        newProduct.setName(requestDTO.getName());
        newProduct.setDescTitle(requestDTO.getDescription());
        newProduct.setPrice(requestDTO.getPrice());
        newProduct.setIsActive(requestDTO.getIsActive());
        newProduct.setCategory(categoriesJPA.findById(requestDTO.getCategoryId()).get());
        newProduct.setMaterial(materialsJPA.findById(requestDTO.getMaterialId()).get());
        newProduct.setColor(colorsJPA.findById(requestDTO.getColorId()).get());

        Product resProduct = productJPA.save(newProduct);

        log.info("Cập nhật sản phẩm id: "+ resProduct.getId());

        return ResponseEntity.ok(resProduct);
    }



    @PostMapping("/create-size/{id}")
    public ResponseEntity<?> createProductSize(@PathVariable("id") Integer id,@RequestBody CreateProductSizeRequestDTO requestDTO) {
        if(!productJPA.existsById(id)){
            return ResponseEntity.badRequest().body("Không tìm thấy sản phẩm với id: "+id);
        }else if(!sizesJPA.existsById(requestDTO.getSizeId())){
            return ResponseEntity.badRequest().body("Không tìm thấy size id: "+requestDTO.getSizeId());
        }

        Product product = productJPA.findById(id).get();

        ProductSize newPrSize = new ProductSize();
        newPrSize.setProduct(product);
        newPrSize.setSize(sizesJPA.findById(requestDTO.getSizeId()).get());
        newPrSize.setQuantity(requestDTO.getQuantity());
        newPrSize.setIsActive(true);
        return ResponseEntity.ok(productSizeJPA.save(newPrSize));
    }


    @PostMapping("/upload-image/{id}")
    public ResponseEntity<?> uploadProductImage(@PathVariable("id")Integer id, @PathParam("file") MultipartFile[] file){
        if(!productJPA.existsById(id)){
            return ResponseEntity.badRequest().body("Không tìm thấy sản phẩm với id: "+id);
        }

        Product product = productJPA.findById(id).get();

        String  newPhoto  = fileService.save("images",file).get(0);
        Images newImage = new Images();
        newImage.setProduct(product);
        newImage.setPhoto(newPhoto);
        newImage.setIsdefault(false);

        return ResponseEntity.ok(imagesJPA.save(newImage));
    }

    @PostMapping("/delete-image/{productId}")
    public ResponseEntity<?> deleteProductImage(@PathVariable("productId") Integer productId, @RequestBody UpdateProductImageRequestDTO requestDTO){
        if(!productJPA.existsById(productId)){
            return ResponseEntity.badRequest().body("Không tìm thấy sản phẩm với id: "+productId);
        }else if(!imagesJPA.existsById(requestDTO.getImgId())){
            return ResponseEntity.badRequest().body("Không tìm thấy ảnh với id: "+requestDTO.getImgId());
        }

        fileService.delete("images",requestDTO.getPhoto());

        imagesJPA.deleteById(requestDTO.getImgId());

        return ResponseEntity.ok().body("Xóa thành công.");

    }

    @PutMapping("/set-default-img/{productId}")
    public ResponseEntity<?> setDefaultProductImage(@PathVariable("productId") Integer productId, @RequestBody UpdateProductImageRequestDTO requestDTO){
        if(!productJPA.existsById(productId)){
            return ResponseEntity.badRequest().body("Không tìm thấy sản phẩm với id: "+productId);
        }else if(!imagesJPA.existsById(requestDTO.getImgId())){
            return ResponseEntity.badRequest().body("Không tìm thấy ảnh với id: "+requestDTO.getImgId());
        }

        imagesJPA.setAllImgNotDefault(productId);

        Images defaultImage = imagesJPA.findById(requestDTO.getImgId()).get();

        defaultImage.setIsdefault(true);

        return ResponseEntity.ok(imagesJPA.save(defaultImage));
    }


    @PutMapping("/update-size/{productId}")
    public ResponseEntity<?> updateProductSize(@PathVariable("productId") Integer productId, @RequestBody UpdateProductSizeRequestDTO requestDTO){
        if(!productJPA.existsById(productId)){
            return ResponseEntity.badRequest().body("Không tìm thấy sản phẩm với id: "+productId);
        }else if(!productSizeJPA.existsById(requestDTO.getSizeId())){
            return ResponseEntity.badRequest().body("Không tìm thấy productsize với id: "+requestDTO.getSizeId());
        }

        ProductSize updatedSize = productSizeJPA.findById(requestDTO.getSizeId()).get();
        updatedSize.setIsActive(requestDTO.getIsActive());
        updatedSize.setQuantity(requestDTO.getQuantity());

        return ResponseEntity.ok(productSizeJPA.save(updatedSize));
    }

    @DeleteMapping("/delete-size/{sizeId}")
    public ResponseEntity<?> updateProductSize(@PathVariable("sizeId") Integer sizeId){
        if(!productSizeJPA.existsById(sizeId)){
            return ResponseEntity.badRequest().body("Không tìm thấy productsize với id: "+sizeId);
        }

        productSizeJPA.deleteById(sizeId);


        return ResponseEntity.ok().body("Xóa size thành công");
    }

}
