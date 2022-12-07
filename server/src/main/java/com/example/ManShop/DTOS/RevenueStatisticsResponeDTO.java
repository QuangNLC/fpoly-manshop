package com.example.ManShop.DTOS;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data

@NoArgsConstructor
@ToString
public class RevenueStatisticsResponeDTO {
    private Integer month;
    private double turnover;

    public RevenueStatisticsResponeDTO(Integer month, double turnover) {
        this.month = month;
        this.turnover = turnover;
    }
}
