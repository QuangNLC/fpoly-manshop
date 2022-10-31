package com.example.ManShop.DTOS;

import com.example.ManShop.Entitys.*;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class BillResponse {
    private Orders order;
    private OrderDetail orderDetail;
    private Product product;
    private Users users;
    private StatusOrder statusOrder;
}
