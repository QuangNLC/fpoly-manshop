package com.example.ManShop.Controller;

import com.example.ManShop.DTOS.ProductResponeDTO;
import com.example.ManShop.DTOS.PromotionProductDTO;
import com.example.ManShop.DTOS.PromotionRequestDTO;
import com.example.ManShop.DTOS.PromotionResponeDTO;
import com.example.ManShop.Entitys.Product;
import com.example.ManShop.Entitys.PromotionProduct;
import com.example.ManShop.Entitys.Promotions;
import com.example.ManShop.JPAs.ProductJPA;
import com.example.ManShop.JPAs.ProductPromotionJPA;
import com.example.ManShop.JPAs.PromotionJPA;
import com.example.ManShop.JPAs.UsersJPA;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/promotions")
public class PromotionsController {
    private final Logger log = LoggerFactory.getLogger(PromotionsController.class);
    @Autowired
    PromotionJPA promotionJPA;
    @Autowired
    ProductJPA productJPA;
    @Autowired
    ProductPromotionJPA productPromotionJPA;

    @Autowired
    UsersJPA userJPA;



    @GetMapping("/all")
    public List<Promotions> getall(){
        return  promotionJPA.findAll();
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updatePromotion(){
        return null;
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> findbyID(@PathVariable("id") Integer id) {
        System.out.println("chay vao ham chi tiet promotion");
        if (!promotionJPA.existsById(id)) {
            return ResponseEntity.status(404).body("Không tìm thấy chương trình khuyến mãi mới (id)=" + id);
        } else {
            return ResponseEntity.ok(convertoDTO(id));
        }
    }




  //  @PreAuthorize("isAuthenticated()")
    @PostMapping("/create")
    public ResponseEntity<?> createPromotion(@RequestBody PromotionRequestDTO promotions){
        if(promotions.getUsers().getUsername() == null){
            System.out.println("không thấy thông tin user");
            return  ResponseEntity.status(111).body("chưa đăng nhập");
        }
        if(promotions.getUsers()== null){
            return  ResponseEntity.status(404).body("dang nhap ho cai");
        }else {
            Promotions newPromotion = new Promotions();
            newPromotion.setUsers(promotions.getUsers());
            newPromotion.setDateafter(promotions.getDateafter());
            newPromotion.setDatebefor(promotions.getDatebefor());
            newPromotion.setTitle(promotions.getTitle());
            newPromotion.setUsers(promotions.getUsers());
            newPromotion.setBypersent(promotions.getBypersent());
            Date a = new Date();
            a.compareTo(promotions.getDateafter());
            if(a.compareTo(promotions.getDateafter()) >=0){
                newPromotion.setIsactive(true);
            }else {
                newPromotion.setIsactive(false);
            }
            newPromotion.setIsauto(true);
            Promotions uppromitons= promotionJPA.save(newPromotion);
            try {
                List<Product> proList= productJPA.findAllById(promotions.getListpr());
                List<PromotionProduct> s = new ArrayList<>();
                for(int i =0; i<proList.size();i++){
                    PromotionProduct newls = new PromotionProduct();
                    newls.setProduct(proList.get(i));
                    newls.setPromition(uppromitons);
                    productPromotionJPA.save(newls);
                    s.add(newls);
                }Promotions prnew = promotionJPA.findById(uppromitons.getId()).get();
                prnew.setPromotionProducts(s);
                return ResponseEntity.ok().body(convertoDTO(prnew.getId()));
            }catch (Exception e){
                System.out.println("có ngoại lệ ");
                return ResponseEntity.status(115).body("có lỗi xảy ra khi chọn sản phẩm");
            }
        }
    }
    @GetMapping("/product-to-promotions")
    public ResponseEntity<?> getProduct(){
        try {
            if(productJPA.findListInteger().size() <= 0){
                return ResponseEntity.ok(productJPA.findAll());
            }
            List<Product> productList = productJPA.findByPromotionActive(productJPA.findListInteger());
            System.out.println(productList.size());
            return ResponseEntity.ok(productList);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        }
    }
    @Transactional
    @PutMapping("/updatepromotion/{id}")
    public ResponseEntity<?> updatePromotions(@RequestBody PromotionRequestDTO promotions,@PathVariable("id") Integer id ) {
        log.info("Gọi vào hàm update promotions với (id) = " + id);
        Promotions promotions1 = promotionJPA.findById(id).get();
        promotions1.setUsers(userJPA.findById(promotions.getUsers().getUsername()).get());
        System.out.println(promotions);
        try {

            productPromotionJPA.deletelistProductPr(promotions1.getId());

                promotions1.setBypersent(promotions.getBypersent());

            if(promotions.getIsActive()==1){
                promotions1.setIsauto(true);
                promotions1.setIsactive(true);
            }else{
                promotions1.setIsactive(false);
                promotions1.setIsauto(false);

            }
            if(promotions.getDateafter() != null) {
                promotions1.setDatebefor(promotions.getDatebefor());
                promotions1.setDateafter(promotions.getDateafter());
            }
            promotions1.setUsers(userJPA.findById(promotions.getUsers().getUsername()).get());
            Promotions uppromitons = promotionJPA.save(promotions1);

            try {
                List<Product> proList = productJPA.findBylistID(promotions.getListpr());
                //    System.out.println(proList.size());
                List<PromotionProduct> s = new ArrayList<>();
                for (int i = 0; i < proList.size(); i++) {
                    PromotionProduct newls = new PromotionProduct();
                    newls.setProduct(proList.get(i));
                    newls.setPromition(uppromitons);
                    productPromotionJPA.save(newls);
                    s.add(newls);
                }
                System.out.println("convert done");
                return ResponseEntity.ok(convertoDTO(id));
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.notFound().build();
            }
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        }
    }


    public PromotionResponeDTO convertoDTO( Integer id){
        Promotions newpr = promotionJPA.findById(id).get();
        PromotionResponeDTO prDTO = new PromotionResponeDTO();
        prDTO.setId(newpr.getId());
        prDTO.setBypersent(newpr.getBypersent());
        prDTO.setIsactive(newpr.isIsactive());
        prDTO.setDateafter(newpr.getDateafter());
        prDTO.setDatebefor(newpr.getDatebefor());
        prDTO.setUsers(newpr.getUsers());
        prDTO.setTitle(newpr.getTitle());
        List<PromotionProduct> lstProProduct = productPromotionJPA.findPromotionPro(newpr.getId());
        List<PromotionProductDTO> s = new ArrayList<>();
        for (int i = 0; i < lstProProduct.size(); i++) {
            PromotionProduct ps = lstProProduct.get(i);
            PromotionProductDTO pdtp = new PromotionProductDTO();
            Product prod = productJPA.findById(ps.getProduct().getId()).get();
            pdtp.setId(ps.getId());
            pdtp.setPromotionPrice(ps.getPromotionPrice());
            ProductResponeDTO a = new ProductResponeDTO();
            a.setId(prod.getId());
            a.setCategory(prod.getCategory());
            a.setImages(prod.getImages());
            a.setCreatedAt(prod.getCreatedAt());
            a.setPrice(prod.getPrice());
            a.setProductsizes(prod.getProductsizes());
            a.setDescTitle(prod.getDescTitle());
            a.setName(prod.getName());
            pdtp.setProduct(a);
            s.add(pdtp);
        }
        prDTO.setPromotionProductDTOList(s);
        return prDTO;
    }
}
