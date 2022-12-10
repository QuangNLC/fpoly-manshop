package com.example.ManShop.Service.impl;

import com.example.ManShop.Entitys.EmailDetails;
import com.example.ManShop.Service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.File;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender javaMailSender;
    @Value("${spring.mail.username}")
    private String sender;

    @Override
    public String sendSimpleleMail(EmailDetails details) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(sender);
            mailMessage.setTo(details.getRecipient());
            mailMessage.setText(details.getMgsBody());
            mailMessage.setSubject(details.getSubject());
            javaMailSender.send(mailMessage);
            return "đđ giửi mail thành công";
        }catch (Exception e){
            e.printStackTrace();
            return "giửi mail thất bại";
        }

    }

    @Override
    public String sendMailWithAttachment(EmailDetails details) {

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper;
        try {
            mimeMessageHelper = new MimeMessageHelper(mimeMessage,true);
            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setTo(details.getRecipient());
            mimeMessageHelper.setText(details.getMgsBody());
            mimeMessageHelper.setSubject(details.getSubject());
            FileSystemResource file = new FileSystemResource(new File(details.getAttachment()));
            javaMailSender.send(mimeMessage);
            return "Giửi mail thành công";
        }catch (MessagingException e){
            return "lôi ";
        }
    }

}
