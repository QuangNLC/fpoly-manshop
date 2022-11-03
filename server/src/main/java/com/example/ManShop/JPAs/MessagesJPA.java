package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.Messages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MessagesJPA extends JpaRepository<Messages, Long> {


    @Query(
            value = "select m from Messages m where (m.createdby.username = :username and m.receivedby.username = 'admchat') or  (m.receivedby.username = :username  and m.sendedby.username = 'admchat')"
    )
    List<Messages> getUserPrivateMessages(String username);




}
