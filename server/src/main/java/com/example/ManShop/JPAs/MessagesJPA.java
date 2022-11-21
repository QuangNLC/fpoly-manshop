package com.example.ManShop.JPAs;

import com.example.ManShop.DTOS.MemberAdmChatResponseDTO;
import com.example.ManShop.Entitys.Messages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface MessagesJPA extends JpaRepository<Messages, Long> {


    @Query(
            value = "select m from Messages m where (m.createdby.username = :username and m.receivedby.username = 'admchat') or  (m.receivedby.username = :username  and m.sendedby.username = 'admchat')"
    )
    List<Messages> getUserPrivateMessages(String username);


    @Query(
            "select new com.example.ManShop.DTOS.MemberAdmChatResponseDTO(m.sendedby.username, max(m.createdat), count(m.status)) from Messages m where m.receivedby.username = 'admchat' and m.sendedby.username = :username group by  m.sendedby.username"
    )
    MemberAdmChatResponseDTO getTest(String username);

    @Query(
            "select count(m.status) from Messages m where m.sendedby.username = :username and m.status =0"
    )
    Long getTotalNewMessage(String username);


    @Modifying
    @Transactional
    @Query(
            nativeQuery = true,
            value = "update messages set status = 1 where receiveduser = 'admchat' and sendeduser = :username")
    int seenMessageByAdm(String username);

}
