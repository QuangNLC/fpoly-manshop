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
import com.example.ManShop.JPAs.UserJPA;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    final PromotionJPA promotionJPA;
    final ProductJPA productJPA;
    final ProductPromotionJPA productPromotionJPA;

    @Autowired
    UserJPA userJPA;

    public PromotionsController(PromotionJPA promotionJPA, ProductJPA productJPA, ProductPromotionJPA productPromotionJPA) {
        this.promotionJPA = promotionJPA;
        this.productJPA = productJPA;
        this.productPromotionJPA = productPromotionJPA;
    }


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




    @PreAuthorize("isAuthenticated()")
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
            newPromotion.setDate_after(promotions.getDate_after());
            newPromotion.setDate_befor(promotions.getDate_befor());
            newPromotion.setTitle(promotions.getTitle());
            newPromotion.setUsers(promotions.getUsers());
            if(promotions.getCheck() == 0){
                newPromotion.setBy_price(0);
                newPromotion.setBy_persent(promotions.getBy_persent());
            }else{
                newPromotion.setBy_price(promotions.getBy_price());
                newPromotion.setBy_persent(0);
            }
            Date a = new Date();
            a.compareTo(promotions.getDate_after());
            if(a.compareTo(promotions.getDate_after()) >=0){
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
            if (promotions.getCheck() == 0) {
                promotions1.setBy_price(0);
                promotions1.setBy_persent(promotions.getBy_persent());
            } else {
                promotions1.setBy_price(promotions.getBy_price());
                promotions1.setBy_persent(0);
            }

            if(promotions.getIsActive()==1){
                promotions1.setIsauto(true);
                promotions1.setIsactive(true);
            }else{
                promotions1.setIsactive(false);
                promotions1.setIsauto(false);

            }
            if(promotions.getDate_after() != null) {
                promotions1.setDate_befor(promotions.getDate_befor());
                promotions1.setDate_after(promotions.getDate_after());
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
//                Promotions prnew = promotionJPA.findById(uppromitons.getId()).get();l
//                prnew.setPromotionProducts(s);
//                prnew.setUsers(userJPA.findById(promotions.getUsers().getUsername()).get());
  //              return ResponseEntity.ok("done");
                             // PromotionResponeDTO sssss = convertoDTO(prnew.getId());
                System.out.println("convert done");
                //System.out.println(sssss);
                return ResponseEntity.ok(convertoDTO(id));
               //  return ResponseEntity.ok().body("done");
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
        prDTO.setBy_persent(newpr.getBy_persent());
        prDTO.setBy_price(newpr.getBy_price());
        prDTO.setIsactive(newpr.isIsactive());
        prDTO.setDate_after(newpr.getDate_after());
        prDTO.setDate_befor(newpr.getDate_befor());
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
            a.setCreate_date(prod.getCreate_date());
            a.setExport_price(prod.getExport_price());
            a.setUpdate_create_date(prod.getUpdate_create_date());
            a.setProductsizes(prod.getProductsizes());
            a.setTitle(prod.getTitle());
            a.setName(prod.getName());
            pdtp.setProduct(a);
            s.add(pdtp);
        }
        prDTO.setPromotionProductDTOList(s);
        return prDTO;
    }
}
