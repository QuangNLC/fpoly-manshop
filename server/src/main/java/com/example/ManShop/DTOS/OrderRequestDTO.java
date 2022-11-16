package com.example.ManShop.DTOS;

import com.example.ManShop.Entitys.Customers;
import com.example.ManShop.Entitys.OrderDetail;
import com.example.ManShop.Entitys.StatusOrder;
import com.example.ManShop.Entitys.Users;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Data
@AllArgsConstructor
@Valid
public class OrderRequestDTO {
    @NotBlank(message = "Không thấy thông tin người dùng")
    private Users users;
    private Customers customers;
    private double total_price;
    private List<OrderDetail> orderDetail;
    private StatusOrder statusOrders;
    private Integer cityId;
    private Integer districtId;
    private Long wardId;
    private String location;


}
