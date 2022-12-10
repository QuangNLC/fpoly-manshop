package com.example.ManShop.Service;

import com.example.ManShop.Entitys.EmailDetails;
import org.springframework.stereotype.Service;

@Service
public interface EmailService {

    String sendSimpleleMail(EmailDetails details);
    String sendMailWithAttachment(EmailDetails details);

}
