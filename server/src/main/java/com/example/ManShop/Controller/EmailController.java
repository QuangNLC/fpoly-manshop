package com.example.ManShop.Controller;

import com.example.ManShop.Entitys.EmailDetails;
import com.example.ManShop.Service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/email")
public class EmailController {

@Autowired
     private EmailService emailService;

//    public EmailController(EmailService emailService) {
//        this.emailService = emailService;
//    }

    @PostMapping("/sendMail")
    public String
    sendMail(@RequestBody EmailDetails details)
    {
        String status
                = emailService.sendSimpleleMail(details);

        return status;
    }

    // Sending email with attachment
    @PostMapping("/sendMailWithAttachment")
    public String sendMailWithAttachment(
            @RequestBody EmailDetails details)
    {
        String status
                = emailService.sendMailWithAttachment(details);

        return status;
    }
}
