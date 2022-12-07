package com.example.ManShop.DTOS;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StatusStatisticResponseDTO {
    private String name;
    private Integer value;
}
