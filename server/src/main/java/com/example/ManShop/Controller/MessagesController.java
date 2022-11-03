package com.example.ManShop.Controller;


import com.example.ManShop.DTOS.MemberAdmChatResponseDTO;
import com.example.ManShop.DTOS.MessageRequestDTO;
import com.example.ManShop.Entitys.Messages;
import com.example.ManShop.Entitys.Users;
import com.example.ManShop.JPAs.MessagesJPA;
import com.example.ManShop.JPAs.UserJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/messages")
public class MessagesController {

    @Autowired
    private MessagesJPA messagesJPA;

    @Autowired
    private UserJPA userJPA;

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @GetMapping("/my-private/{username}")
    public ResponseEntity<?> getMyPrivateMessages(@PathVariable String username){
        if(!userJPA.existsById(username)){
            return ResponseEntity.notFound().build();
        }
        System.out.println("get private messages of: " + username);
        return ResponseEntity.ok(messagesJPA.getUserPrivateMessages(username));
    }

    @PostMapping("/adm-private/reply/{username}")
    public  ResponseEntity<?> replyUserPrivateMessage(@PathVariable String username, @RequestBody MessageRequestDTO reqMessage){
        System.out.println("adm rep message to : " + username);
        if(!userJPA.existsById(username)){
            return ResponseEntity.notFound().build();
        }
        reqMessage.setCreatedat(new Date());
        reqMessage.setReceivedby(username);
        reqMessage.setStatus(false);
        try{
            Messages m = new Messages();
            Users createU = new Users();
            createU.setUsername("admchat");
            Users sendU = new Users();
            sendU.setUsername(reqMessage.getSendedby());
            Users receiveU = new Users();
            receiveU.setUsername(reqMessage.getReceivedby());
            m.setCreatedby(createU);
            m.setSendedby(sendU);
            m.setReceivedby(receiveU);
            m.setContent(reqMessage.getContent());
            m.setStatus(false);
            m.setCreatedat(reqMessage.getCreatedat());
            Messages resM = messagesJPA.save(m);
            System.out.println("save message to dtb");
            simpMessagingTemplate.convertAndSendToUser(reqMessage.getReceivedby(),"/private", resM);   //user/{username}/private
            return ResponseEntity.ok(resM);
        }catch(Exception e){
            System.out.println(e);
        }


        return ResponseEntity.ok(reqMessage);
    }

    @PostMapping("/user/send-private/{username}")
    public  ResponseEntity<?> sendPrivateMessageToAdm(@PathVariable String username, @RequestBody MessageRequestDTO reqMessage){
        System.out.println("user : " + username + " send private message to adm");
        if(!userJPA.existsById(username)){
            return ResponseEntity.notFound().build();
        }
        reqMessage.setCreatedat(new Date());
        reqMessage.setReceivedby(username);
        reqMessage.setStatus(false);
        try{
            Messages m = new Messages();
            Users createU = new Users();
            createU.setUsername(username);
            Users sendU = new Users();
            sendU.setUsername(username);
            Users receiveU = new Users();
            receiveU.setUsername("admchat");
            m.setCreatedby(createU);
            m.setSendedby(sendU);
            m.setReceivedby(receiveU);
            m.setContent(reqMessage.getContent());
            m.setStatus(false);
            m.setCreatedat(reqMessage.getCreatedat());
            Messages resM = messagesJPA.save(m);
            System.out.println("save message to dtb");
            simpMessagingTemplate.convertAndSendToUser(reqMessage.getReceivedby(),"/private", resM);   //user/{username}/private
            return ResponseEntity.ok(resM);
        }catch(Exception e){
            System.out.println(e);
        }


        return ResponseEntity.ok(reqMessage);
    }


    @GetMapping("/adm/get-member-list")
    public ResponseEntity<?> getChatMemberList(){
        List<MemberAdmChatResponseDTO> list = userJPA.getListMemberChatByAdm();

        return ResponseEntity.ok(userJPA.getListMemberChatByAdm());
    }


}
