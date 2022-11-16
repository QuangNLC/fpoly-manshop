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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/promotions")
public class PromotionsController {

    final PromotionJPA promotionJPA;
    final ProductJPA productJPA;
    final ProductPromotionJPA productPromotionJPA;



    public PromotionsController(PromotionJPA promotionJPA, ProductJPA productJPA, ProductPromotionJPA productPromotionJPA) {
        this.promotionJPA = promotionJPA;
        this.productJPA = productJPA;
        this.productPromotionJPA = productPromotionJPA;
    }


    @GetMapping("/all")
    public List<Promotions> getall(){
        return  promotionJPA.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findbyID(@PathVariable("id") Integer id) {
        if (!promotionJPA.existsById(id)) {
            return ResponseEntity.status(404).body("Không tìm thấy chương trình khuyến mãi mới (id)=" + id);
        } else {
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
                a.setImport_price(prod.getImport_price());
                a.setUpdate_create_date(prod.getUpdate_create_date());
                a.setProductsizes(prod.getProductsizes());
                a.setTitle(prod.getTitle());
                a.setName(prod.getName());

                pdtp.setProduct(a);
                s.add(pdtp);

            }
            prDTO.setPromotionProductDTOList(s);
            return ResponseEntity.ok(prDTO);
        }
    }

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
                newPromotion.setIsactive(true);
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
                return ResponseEntity.ok().body(prnew);
            }catch (Exception e){
                System.out.println("có ngoại lệ ");
                return ResponseEntity.status(115).body("có lỗi xảy ra khi chọn sản phẩm");
            }
        }
    }
}
