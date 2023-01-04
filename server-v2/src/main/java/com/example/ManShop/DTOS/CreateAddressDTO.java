package com.example.ManShop.DTOS;

import lombok.Data;

@Data
public class CreateAddressDTO {
    private String name;
    private String phone;
    private String cityName;
    private int cityCode;
    private String districtName;
    private int districtCode;
    private String wardName;
    private String wardCode;
    private String location;
    private String username;
}
