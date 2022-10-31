package com.example.ManShop.DTOS;

import com.example.ManShop.Entitys.MessageStatus;
import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MessageRequestDTO {
    @NotBlank(message = "không được để trống thông tin")
    private String senderName;
    @NotBlank(message = "không được để trống thông tin")
    private String receiverName;
    @NotBlank(message = "không được để trống thông tin")
    private String message;
    private String date;
    private MessageStatus status;
}
