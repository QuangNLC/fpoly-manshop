package com.example.ManShop.DTOS;

import com.example.ManShop.Entitys.Customers;
import com.example.ManShop.Entitys.OrderDetail;
import com.example.ManShop.Entitys.StatusDetail;
import com.example.ManShop.Entitys.Users;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.Valid;
import java.util.List;

@Data
@AllArgsConstructor
@Valid
public class UpDateStatusOrderDTO {
    // user de update nhe
    private Users users;
    private String  DescriptionOder=null;
    private String statusOrder=null;
    private  Boolean isFinish=false;
    private Customers customers= null;
    private double total_price = 0;
    private double reduce_price = 0;
    private List<OrderDetail> orderDetail =null ;
    private Integer cityId =null;
    private Integer districtId=null;
    private Long wardId =null;
    private String location=null;


}
