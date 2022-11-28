package com.example.ManShop.DTOS;

import com.example.ManShop.Entitys.Customers;
import com.example.ManShop.Entitys.OrderDetail;
import com.example.ManShop.Entitys.Users;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.Valid;
import java.util.List;

@Data
@AllArgsConstructor
@Valid
public class OrderOfflineDTO {
    private Users users;
    private Customers customers;
    private double total_price;
    private List<OrderDetail> orderDetail;
    private String  statusOrders;
    private Integer cityId;
    private Integer districtId;
    private Long wardId;
    private String location;
    private String description;


}
