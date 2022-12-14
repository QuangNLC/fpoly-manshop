package com.example.ManShop.JPAs;

import com.example.ManShop.DTOS.MemberAdmChatResponseDTO;
import com.example.ManShop.Entitys.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserJPA extends JpaRepository<Users,String> {
    Page<Users> findAll(Pageable pageable);
    Boolean existsByEmail(String email);


//    @Query("SELECT  u from Users u join Messages m on u.username = m.sendedby.username where m.receivedby.username = 'admchat'" +
//            "GROUP BY u.username")
    @Query(nativeQuery = true,
        value = "select users.* from users join messages on users.username = messages.sendeduser where messages.receiveduser = 'admchat' group by username, activated, address, email, fullname,password, photo,phone,verificode,role"
    )
    Users findByEmail(String email);
    List<Users> getListMemberChatByAdm();
}

