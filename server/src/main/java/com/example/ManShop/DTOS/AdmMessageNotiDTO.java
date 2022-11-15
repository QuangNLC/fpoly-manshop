package com.example.ManShop.DTOS;


import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AdmMessageNotiDTO {
    private String username;
    private Date latestmessage;
    private Long newmessage;
}
