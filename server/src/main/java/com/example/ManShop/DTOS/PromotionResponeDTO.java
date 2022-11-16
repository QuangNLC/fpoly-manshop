package com.example.ManShop.DTOS;

import com.example.ManShop.Entitys.Users;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class PromotionResponeDTO {
    private int id;
    private Date date_after;
    private Date date_befor;
    private String title;
    private Users users;
    private  double by_price;
    private int  by_persent;
    private boolean isactive;
    List<PromotionProductDTO> promotionProductDTOList;

}
