package com.example.ManShop.Controller;


import com.example.ManShop.DTOS.AdmMessageNotiDTO;
import com.example.ManShop.DTOS.MemberAdmChatResponseDTO;
import com.example.ManShop.DTOS.MessageRequestDTO;
import com.example.ManShop.Entitys.Messages;
import com.example.ManShop.Entitys.Users;
import com.example.ManShop.JPAs.MessagesJPA;
import com.example.ManShop.JPAs.UserJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

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
        System.out.println("User get private messages of: " + username);
        return ResponseEntity.ok(messagesJPA.getUserPrivateMessages(username));
    }

    @GetMapping("/adm/my-private/{username}")
    public ResponseEntity<?> getMyPrivateMessagesForAdm(@PathVariable String username){
        if(!userJPA.existsById(username)){
            return ResponseEntity.notFound().build();
        }
        System.out.println("Adm get private messages of: " + username);
        messagesJPA.seenMessageByAdm(username);
        System.out.println("Adm seen messages of: " + username);
        AdmMessageNotiDTO resNoti = new AdmMessageNotiDTO();
        resNoti.setUsername(username);
        resNoti.setLatestmessage(new Date());
        resNoti.setNewmessage(Long.parseLong("0"));
        resNoti.setResetCount(true);
        System.out.println(resNoti);
        simpMessagingTemplate.convertAndSend("/noti/adm-message",resNoti);
        simpMessagingTemplate.convertAndSend("/noti/adm-message-count",messagesJPA.getCountNewMessage());
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
            simpMessagingTemplate.convertAndSend("/noti/adm-message-count",messagesJPA.getCountNewMessage());
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
            AdmMessageNotiDTO resNoti = new AdmMessageNotiDTO();
            resNoti.setUsername(username);
            resNoti.setLatestmessage(new Date());
            resNoti.setNewmessage(messagesJPA.getTotalNewMessage(username));
            System.out.println(resNoti);
            simpMessagingTemplate.convertAndSend("/noti/adm-message",resNoti);
            simpMessagingTemplate.convertAndSend("/noti/adm-message-count",messagesJPA.getCountNewMessage());
            simpMessagingTemplate.convertAndSendToUser(reqMessage.getReceivedby(),"/private", resM);   //user/{username}/private
            return ResponseEntity.ok(resM);
        }catch(Exception e){
            System.out.println(e);
        }


        return ResponseEntity.ok(reqMessage);
    }


    @GetMapping("/adm/get-member-list")
    public ResponseEntity<?> getChatMemberList(){
        List<Users> listU = userJPA.getListMemberChatByAdm();

        List<MemberAdmChatResponseDTO> resList = new ArrayList<>();
        if(listU.size() > 0){
            for (int i = 0; i < listU.size(); i++) {
                MemberAdmChatResponseDTO r = messagesJPA.getTest(listU.get(i).getUsername());
                r.setNewmessage(messagesJPA.getTotalNewMessage(listU.get(i).getUsername()));
                resList.add(r);
            }
        }




        return ResponseEntity.ok(resList);
    }

    @GetMapping("/adm/get-message-count")
    public ResponseEntity<?> getMessageCountByAdm(){
        System.out.println(messagesJPA.getCountNewMessage());
        return ResponseEntity.ok(messagesJPA.getCountNewMessage());
    }


    @GetMapping("/adm/seen-message/{username}")
    public ResponseEntity<?> seenMessageByAdm(@PathVariable String username){
        System.out.println("adm seen message"+ username);
        messagesJPA.seenMessageByAdm(username);
        AdmMessageNotiDTO resNoti = new AdmMessageNotiDTO();
        resNoti.setUsername(username);
        resNoti.setLatestmessage(new Date());
        resNoti.setNewmessage(Long.parseLong("0"));
        resNoti.setResetCount(true);
        System.out.println(resNoti);
        simpMessagingTemplate.convertAndSend("/noti/adm-message",resNoti);
        simpMessagingTemplate.convertAndSend("/noti/adm-message-count",messagesJPA.getCountNewMessage());
        return ResponseEntity.ok("adm seen" + username);
    }



}
