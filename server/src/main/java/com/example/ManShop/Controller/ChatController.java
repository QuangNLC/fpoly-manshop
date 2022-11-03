package com.example.ManShop.Controller;

import com.example.ManShop.DTOS.MessageRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin("*")
public class ChatController {
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/message")
    @SendTo("/chatroom/public")
    public MessageRequestDTO receiverPublicMessage(@Payload MessageRequestDTO message){
        return message;
    }

    @MessageMapping("/private-message")
    public MessageRequestDTO reiceiverPrivateMessage(@Payload MessageRequestDTO message){
        simpMessagingTemplate.convertAndSendToUser(message.getReceivedby(),"/private", message); //user/David/private
        return message;
    }
}
