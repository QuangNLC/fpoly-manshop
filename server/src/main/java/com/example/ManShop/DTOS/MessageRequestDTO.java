package com.example.ManShop.DTOS;

import com.example.ManShop.Entitys.MessageStatus;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MessageRequestDTO {
    private String createdby;
    private String sendedby;
    private String receivedby;
    private String content;
    private Date createdat;
    private Boolean status;
}
