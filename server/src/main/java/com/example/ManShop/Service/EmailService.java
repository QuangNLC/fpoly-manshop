package com.example.ManShop.Service;

import com.example.ManShop.Entitys.EmailDetails;

import com.example.ManShop.Entitys.Users;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

@Service
public interface EmailService {

    void sendSimpleleMail(EmailDetails details);
    void sendMailWithAttachment(EmailDetails details);
    void sendEmail(String to, String subject, String message);

    void pushVerifyMail(Users user, String siteURL) throws MessagingException, UnsupportedEncodingException;
    void pustTatusorder(Users user, String siteURL) throws MessagingException, UnsupportedEncodingException;

}
