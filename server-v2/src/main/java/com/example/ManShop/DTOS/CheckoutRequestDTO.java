package com.example.ManShop.DTOS;

import com.example.ManShop.Entitys.OrderDetail;
import com.example.ManShop.Entitys.StatusOrder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@Valid
@NoArgsConstructor
public class CheckoutRequestDTO {

    private String username;
    private Date createdAt = new Date();
    private Date updatedAt = new Date();
    private String note;
    private StatusOrder orderStatus;
    private String orderType;
    //payinfo
    private Double totalPrice;
    private Double discount;
    private Double surcharge;
    private Double refund;
    private Double shipFee;

    //customer info
    private String fullname;
    private String phone;
    private String cityName;
    private int cityCode;
    private String districtName;
    private int districtCode;
    private String wardName;
    private String wardCode;
    private String location;

    //order detail
    private List<OrderDetail> orderDetail;



}
