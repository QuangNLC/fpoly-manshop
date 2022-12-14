package com.example.ManShop.Service.impl;

import com.example.ManShop.Entitys.EmailDetails;
import com.example.ManShop.Entitys.Users;
import com.example.ManShop.Service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.File;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private  JavaMailSender javaMailSender;
    @Value("${spring.mail.username}")
    private String sender;


    List<MimeMessage> queue = new ArrayList<>();
    List<SimpleMailMessage> queue1 = new ArrayList<>();

    @Override
    public void sendSimpleleMail(EmailDetails details) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(sender);
            mailMessage.setTo(details.getRecipient());
            mailMessage.setText(details.getMgsBody());
            mailMessage.setSubject(details.getSubject());
            this.javaMailSender.send(mailMessage);
            queue1.add(mailMessage);
        }catch (Exception e){
            e.printStackTrace();
        }

    }

    @Override
    public void sendMailWithAttachment(EmailDetails details) {

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

        }catch (MessagingException e){
            e.printStackTrace();
        }
    }


    @Override
    public void sendEmail(String to, String subject, String message) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();

        simpleMailMessage.setFrom(sender);
        simpleMailMessage.setTo(to);
        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setText(message);

        this.javaMailSender.send(simpleMailMessage);
    }


    @Override
    public void pustTatusorder(Users user, String siteURL) throws MessagingException, UnsupportedEncodingException {
        String to = user.getEmail();
        String from = sender;
        String senderName = "ManShop Ecommerce";
        String subject = "Please verify your registration";
        String content = "Dear [[name]],<br>"
                + "Please click the link below to verify your registration:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>"
                + "Thank you,<br>"
                + "Your company name.";


        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(from, senderName);
        helper.setTo(to);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getFullname());
        String verifyURL = "http://localhost:8080/api/auth/verify?code="+user.getVerificode();

        content = content.replace("[[URL]]", verifyURL);

        helper.setText(content, true);
        queue.add(message);
    }
    @Override
    public void pushVerifyMail(Users user, String siteURL) throws MessagingException, UnsupportedEncodingException {
        String to = user.getEmail();
        String from = sender;
        String senderName = "ManShop Ecommerce";
        String subject = "Please verify your registration";
        String content = "Dear [[name]],<br>"
                + "Please click the link below to verify your registration:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>"
                + "Thank you,<br>"
                + "Your company name.";


        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(from, senderName);
        helper.setTo(to);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getFullname());
        String verifyURL = "http://localhost:8080/api/auth/verify?code="+user.getVerificode();

        content = content.replace("[[URL]]", verifyURL);

        helper.setText(content, true);
        queue.add(message);
    }
    @Scheduled(fixedRate = 10*1000, initialDelay = 5000)
    public void run(){
        int success =0, error = 0;
        while (!queue1.isEmpty() && queue.size() > 0){
            MimeMessage message = queue.remove(0);
            SimpleMailMessage m = queue1.remove(0);
            try{
                javaMailSender.send(m);
                javaMailSender.send(message);
                success++;
            }catch(Exception e){
                error++;
            }
            System.out.printf(">> Send: %d, Error: %d\r\n", success, error);
        }
    }

}
