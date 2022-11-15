package com.example.ManShop.DTOS;


import com.example.ManShop.Entitys.Users;
import lombok.*;

import java.util.Date;

@Data
@NoArgsConstructor
@ToString
@AllArgsConstructor
@Getter
@Setter
public class MemberAdmChatResponseDTO {
    private String username;
    private Date latestmessage;
    private Long newmessage;


    public MemberAdmChatResponseDTO(String username, Date latestmessage) {
        this.username = username;
        this.latestmessage = latestmessage;
    }
}
