package com.example.ManShop.DTOS;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.Valid;

@Data
@AllArgsConstructor
@Valid
public class UpdateOrderPaymentInfoRequestDTO {

    private String description;
    private Double paymentfee;
    private String paymenttype;
    private Integer paymentId;
    private String updatedUser;
    private Boolean paymentRefund;
}
