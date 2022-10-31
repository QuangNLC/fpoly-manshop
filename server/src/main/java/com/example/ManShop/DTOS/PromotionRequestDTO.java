package com.example.ManShop.DTOS;

import com.example.ManShop.Entitys.Users;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.List;

@Data
public class PromotionRequestDTO {
    @NotBlank(message = "không được để trống thông tin")
    private Date date_after;
    @NotBlank(message = "không được để trống thông tin")
    private Date date_befor;
    @NotBlank(message = "không được để trống thông tin")
    private String title;
    private Users users;
    @NotBlank(message = "không được để trống thông tin")
    private double by_price;
    @NotBlank(message = "không được để trống thông tin")
    private int by_persent;
    @NotBlank(message = "không được để trống thông tin")
    private int check;
    @NotBlank(message = "không được để trống thông tin")
    private List<Integer> listpr;

}
