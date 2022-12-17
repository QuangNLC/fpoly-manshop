package com.example.ManShop.DTOS;

import com.example.ManShop.Entitys.Users;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
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
