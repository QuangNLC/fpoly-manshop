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

    private Date dateafter=null;
    private Date datebefor=null;
    private String title=null;
    private Users users;
    private int  bypersent=0;
    private int isActive;
    private List<Integer> listpr;

}
