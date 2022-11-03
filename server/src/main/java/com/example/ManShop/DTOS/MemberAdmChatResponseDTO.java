package com.example.ManShop.DTOS;


import com.example.ManShop.Entitys.Users;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MemberAdmChatResponseDTO {
    private String username;
    private Date latedmessage;
}
