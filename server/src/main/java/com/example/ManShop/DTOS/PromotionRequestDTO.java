package com.example.ManShop.DTOS;

import com.example.ManShop.Entitys.Users;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class PromotionRequestDTO {

    private Date date_after=null;
    private Date date_befor=null;
    private String title=null;
    private Users users=null;
    private  double by_price=0;
    private int  by_persent=0;
    private int check=1;
    private boolean isActive;
    private List<Integer> listpr;

}
