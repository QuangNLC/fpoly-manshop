package com.example.ManShop.DTOS;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.Valid;

@Data
@AllArgsConstructor
@Valid
public class UpdateOrderInfoRequestDTO {
    private String fullname;
    private String phone;
    private String cityName;
    private int cityCode;
    private String districtName;
    private int districtCode;
    private String wardName;
    private String wardCode;
    private String location;
    private Double shipfee;
    private String updatedUser;
}
