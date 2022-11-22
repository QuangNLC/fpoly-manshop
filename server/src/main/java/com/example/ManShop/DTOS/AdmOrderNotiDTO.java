package com.example.ManShop.DTOS;

import com.example.ManShop.Entitys.OrderNoti;
import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AdmOrderNotiDTO {
    private List<OrderNoti> list;
    private Long count;
}
