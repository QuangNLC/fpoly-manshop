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
public class PromotionRequestDTO {

    private Date date_after=null;
    private Date date_befor=null;
    private String title=null;
    private Users users;
    private  double by_price=0;
    private int  by_persent=0;
    private int check=1;
    private int isActive;
    private List<Integer> listpr;

}
