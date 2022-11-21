package com.example.ManShop.DTOS;

import lombok.Data;

import java.util.List;

@Data
public class OrderListResquestDTO {
    List<Integer> integerList;
    int ststusOrder;
}
