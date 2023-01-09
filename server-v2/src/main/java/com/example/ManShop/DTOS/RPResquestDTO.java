package com.example.ManShop.DTOS;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RPResquestDTO {
    private String title;
    @JsonIgnore
    private Integer id;
}
