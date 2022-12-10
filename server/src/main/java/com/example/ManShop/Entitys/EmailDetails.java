package com.example.ManShop.Entitys;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmailDetails {
    private String recipient;
    private String mgsBody;
    private String subject;
    private String attachment;

}
