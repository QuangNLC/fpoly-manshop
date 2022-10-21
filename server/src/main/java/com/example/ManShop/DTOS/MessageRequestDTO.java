package com.example.ManShop.DTOS;

import com.example.ManShop.Entitys.MessageStatus;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MessageRequestDTO {
    private String senderName;
    private String receiverName;
    private String message;
    private String date;
    private MessageStatus status;
}
