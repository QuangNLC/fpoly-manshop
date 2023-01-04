package com.example.ManShop.Controller;

import com.example.ManShop.JPAs.UsersJPA;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/users")
public class UsersController {
    private final Logger log = LoggerFactory.getLogger(UsersController.class);

    @Autowired
    private UsersJPA usersJPA;

    @GetMapping()
    public ResponseEntity<?> getUserById(@PathParam("username") String username) {
        if(!usersJPA.existsById(username)) {
            log.error("không thấy tài khoản" + username);
            return ResponseEntity.notFound().build();
        }
        log.info("đã tìm thấy  tài khoản voi username: " +username);
        return ResponseEntity.ok(usersJPA.findById(username).get());
    }

    @GetMapping("/getall")
    public ResponseEntity<?> getUsers() {
        log.info("gọi vào hàm tìm kiếm tất cả user");
        return ResponseEntity.ok(usersJPA.findAll());
    }

}
