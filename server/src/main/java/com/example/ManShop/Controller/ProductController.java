package com.example.ManShop.Controller;

import com.example.ManShop.DTOS.FilterInfoResponseDTO;
import com.example.ManShop.DTOS.FilterRequestDTO;
import com.example.ManShop.DTOS.productcreateDTO;
import com.example.ManShop.Entitys.Categorys;
import com.example.ManShop.Entitys.Images;
import com.example.ManShop.Entitys.Product;
import com.example.ManShop.Entitys.ProductSize;
import com.example.ManShop.Entitys.Sizes;
import com.example.ManShop.JPAs.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.example.ManShop.DTOS.PagePaginationResponeDTO;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/product")
public class ProductController {
    private final Logger log = LoggerFactory.getLogger(ProductController.class);
    final
    ProductJPA  productJPA;

    final
    CategoryJPA categoryJPA;
    final
    MaterialJPA  materialJPA;

    final
    ImagesJPA imagesJPA;

    final
    ProductsizeJPA productsizeJPA;

    @Autowired
    SizeJPA sizesJPA;

    @Autowired
    ComboJPA comboJPA;

    public ProductController(ProductJPA productJPA, MaterialJPA materialJPA, CategoryJPA categoryJPA, ImagesJPA imagesJPA, ProductsizeJPA productsizeJPA) {
        this.productJPA = productJPA;
        this.categoryJPA = categoryJPA;
        this.materialJPA = materialJPA;
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

    @GetMapping("/get/filter/info")
    public ResponseEntity<FilterInfoResponseDTO> getFilterInfo(){
        log.info("Gọi hàm get thông tin của bộ lọc(filter) trang sản phẩm");
        FilterInfoResponseDTO response = new FilterInfoResponseDTO();
        response.setCategories(categoryJPA.findAll());
        response.setSizes(sizesJPA.findAll());
        response.setMaxPrice(Double.parseDouble("1000000000"));
        return ResponseEntity.ok(response);
    }




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
        Integer totalPaeg = productJPA.findByCategory_Id(pagedefalut,categoryid).stream().collect(Collectors.toList()).size()%limit == 0 ? productJPA.findByCategory_Id(pagedefalut,categoryid).stream().collect(Collectors.toList()).size()/limit : productJPA.findByCategory_Id(pagedefalut,categoryid).stream().collect(Collectors.toList()).size()/limit+1;
        Integer totalItem = productJPA.findByCategory_Id(pagedefalut,categoryid).stream().collect(Collectors.toList()).size();
        PagePaginationResponeDTO response = new PagePaginationResponeDTO(resList,limit,page,totalPaeg, totalItem);

        return ResponseEntity.ok(response);
    }
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/create")
    public ResponseEntity<?> createProduct(@RequestBody productcreateDTO product) {
        log.info("tạo sản phẩm");
        Categorys category = categoryJPA.findById(product.getCategory().getId()).get();
        Product newproduct = new Product();
        newproduct.setCreate_date(new Date());
        newproduct.setExport_price(product.getExport_price());
        newproduct.setName(product.getName());
        newproduct.setTitle(product.getTitle());
        newproduct.setCategory(category);
        newproduct.setMaterial(materialJPA.findById(product.getMaterial()).get());
        Product returnproduct = productJPA.save(newproduct);
        try{
            List<ProductSize> ProSizeList = product.getProductsizes();
            ProSizeList.forEach( Size -> {
                Size.setProduct(returnproduct);
                productsizeJPA.save(Size);
            });
        }catch (Exception e){
            return ResponseEntity.status(113).body("Có lỗ không xác định khi chọn size");
        }
        try {
            List<Images> imagesList= product.getImages();
            System.out.println(product.getImages());
            imagesList.forEach(images -> {
                images.setProduct(returnproduct);
                imagesJPA.save(images);
            });
        }catch (NullPointerException e){
            return ResponseEntity.status(003).body("anhr truyen vao bi trong");
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(404).body("chu bat duoc ngoai le");
        }
        return ResponseEntity.ok("Tao thanh cong san pham (id)= "+returnproduct.getId());
    }
    @PreAuthorize("isAuthenticated()")
    @PutMapping("/update/{id}")
    @Transactional
    public ResponseEntity<?> updateProduct(@PathVariable("id") Integer id, @RequestBody Product product) {
        if(!productJPA.existsById(id)){
            return ResponseEntity.status(77).body("khong tim thay (id)");
        }
        product.setId(id);
        Categorys category = categoryJPA.findById(product.getCategory().getId()).get();
        product.setCategory(category);
        product.setUpdate_create_date(new Date());
        List<ProductSize> ProSizeList = product.getProductsizes();
        try{
            productsizeJPA.deletelist(id);
        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(113).body("Lỗi không xác định khi xoa' size");
        }
        try{
            ProSizeList.forEach( Size -> {Size.setProduct(product);productsizeJPA.save(Size);});
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(113).body("Lỗi không xác định khi cập nhập size");
        }
        List<Images> imagesList= product.getImages();
        try {
            imagesList.forEach(images -> {images.setProduct(product);imagesJPA.save(images);});
        }catch (Exception e){
            e.printStackTrace();
            ResponseEntity.status(113).body("lỗi không xác định khi cập nhập hình ảnh");
        }
        productJPA.save(product);
        return ResponseEntity.ok().body(product);
    }

    @PreAuthorize("isAuthenticated()")
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

    @PostMapping("/byFilterAndSort")
    public ResponseEntity<?> testFilterAndSort(@RequestBody FilterRequestDTO a,@RequestParam("page") Integer page,@RequestParam("limit")Integer limit) {
        Pageable setpage;
        Pageable pagedefalut = PageRequest.of(0, 1000000);
        int ix = page - 1;
        if (ix <= 0) {
            switch (a.getSortId()){
                case (1):{
                    setpage = PageRequest.of(0, limit, Sort.by(Sort.Direction.ASC, "name"));
                    break;
                }
                case (2):{
                    setpage = PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "name"));
                    break;
                }
                case (3):{
                    setpage = PageRequest.of(0, limit, Sort.by(Sort.Direction.ASC, "export_price"));
                    break;
                }
                case (4):{
                    setpage = PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "export_price"));
                    break;
                }
                case (5):{
                    setpage = PageRequest.of(0, limit, Sort.by(Sort.Direction.ASC, "create_date"));
                    break;
                }
                case (6):{
                    setpage = PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "create_date"));
                    break;
                }
                default:{
                    setpage = PageRequest.of(0, limit, Sort.by(Sort.Direction.ASC, "name"));
                    break;
                }
            }
        } else {
            switch (a.getSortId()){
                case (1):{
                    setpage = PageRequest.of(ix, limit, Sort.by(Sort.Direction.ASC, "name"));
                    break;
                }
                case (2):{
                    setpage = PageRequest.of(ix, limit, Sort.by(Sort.Direction.DESC, "name"));
                    break;
                }
                case (3):{
                    setpage = PageRequest.of(ix, limit, Sort.by(Sort.Direction.ASC, "export_price"));
                    break;
                }
                case (4):{
                    setpage = PageRequest.of(ix, limit, Sort.by(Sort.Direction.DESC, "export_price"));
                    break;
                }
                case (5):{
                    setpage = PageRequest.of(ix, limit, Sort.by(Sort.Direction.ASC, "create_date"));
                    break;
                }
                case (6):{
                    setpage = PageRequest.of(ix, limit, Sort.by(Sort.Direction.DESC, "create_date"));
                    break;
                }
                default:{
                    setpage = PageRequest.of(ix, limit, Sort.by(Sort.Direction.ASC, "name"));
                    break;
                }
            }
        }
        System.out.println(setpage);
        log.info("goi ham filter "  + page.toString() + "-" +  limit.toString());

        FilterRequestDTO lastfilter = suportFilter(a);
        if(lastfilter.getCategoryId() != 0){
            List<Product> responseList = productJPA.findByCategory_IdAndSizeList(lastfilter.getCategoryId(),lastfilter.getSizes(), lastfilter.getMinPrice(), lastfilter.getMaxPrice(),a.getName(), setpage).stream().collect(Collectors.toList());
            Integer responseTotalPage = productJPA.findByCategory_IdAndSizeList(lastfilter.getCategoryId(),lastfilter.getSizes(), lastfilter.getMinPrice(), lastfilter.getMaxPrice(),a.getName(), setpage).stream().collect(Collectors.toList()).size() % limit == 0 ? productJPA.findByCategory_IdAndSizeList(lastfilter.getCategoryId(),lastfilter.getSizes(), lastfilter.getMinPrice(), lastfilter.getMaxPrice(),a.getName(), setpage).stream().collect(Collectors.toList()).size() / limit : productJPA.findByCategory_IdAndSizeList(lastfilter.getCategoryId(),lastfilter.getSizes(), lastfilter.getMinPrice(), lastfilter.getMaxPrice(),a.getName(), setpage).stream().collect(Collectors.toList()).size() / limit + 1;
            Integer resTotalItem = productJPA.findByCategory_IdAndSizeList(lastfilter.getCategoryId(),lastfilter.getSizes(), lastfilter.getMinPrice(), lastfilter.getMaxPrice(),a.getName(), pagedefalut).stream().collect(Collectors.toList()).size();
            PagePaginationResponeDTO response = new PagePaginationResponeDTO(responseList, limit, page, responseTotalPage, resTotalItem);
            return ResponseEntity.ok(response);
        }else{
            List<Product> responseList = productJPA.findByListSize(lastfilter.getSizes(), lastfilter.getMinPrice(), lastfilter.getMaxPrice(),a.getName(), setpage).stream().collect(Collectors.toList());
            Integer responseTotalPage = productJPA.findByListSize(lastfilter.getSizes(), lastfilter.getMinPrice(), lastfilter.getMaxPrice(),a.getName(), setpage).stream().collect(Collectors.toList()).size() % limit == 0 ? productJPA.findByListSize(lastfilter.getSizes(), lastfilter.getMinPrice(), lastfilter.getMaxPrice(),a.getName(), setpage).stream().collect(Collectors.toList()).size() / limit : productJPA.findByListSize(lastfilter.getSizes(), lastfilter.getMinPrice(), lastfilter.getMaxPrice(),a.getName(), setpage).stream().collect(Collectors.toList()).size() / limit + 1;
            Integer resTotalItem = productJPA.findByListSize(lastfilter.getSizes(), lastfilter.getMinPrice(), lastfilter.getMaxPrice(),a.getName(),pagedefalut).stream().collect(Collectors.toList()).size();
            PagePaginationResponeDTO response = new PagePaginationResponeDTO(responseList, limit, page,responseTotalPage,resTotalItem);
            return ResponseEntity.ok(response);
        }
    }

    @GetMapping("getNewProducts")
    public ResponseEntity<?>  testFilter(){
        Pageable setpage;
        Pageable pagedefalut = PageRequest.of(0, 10);
        return  ResponseEntity.ok(productJPA.findNewProducts(pagedefalut));
    }

    public FilterRequestDTO suportFilter(FilterRequestDTO a){
        log.info("goi vao ham suport");
        FilterRequestDTO up = new FilterRequestDTO();
        Integer id = a.getCategoryId();
        List<Integer> aaaa = a.getSizes();
        double min = a.getMinPrice();
        double max = a.getMaxPrice();
        String sort = a.getSortname();
        if (min == 0 || max == 0) {
            max = 1000000000000.0;
        }
        if(aaaa.size()==0){
            List<Sizes> sizeJPAS=  sizesJPA.findAll();
            for(int i=0 ; i< sizeJPAS.size() ;i++) {
                aaaa.add(i+1);
            }
        }
        up.setCategoryId(id);
        up.setSizes(aaaa);
        up.setMinPrice(min);
        up.setMaxPrice(max);
        up.setSortname(sort);
        return up;
    }


    @PostMapping("/get/byFilter")
    public ResponseEntity<?> niqGetListProductByFilter(@RequestBody FilterRequestDTO a,@RequestParam("categoryId") Integer categoryId,@RequestParam("page") Integer page,@RequestParam("limit")Integer limit){
        return ResponseEntity.ok().build();
    }
}