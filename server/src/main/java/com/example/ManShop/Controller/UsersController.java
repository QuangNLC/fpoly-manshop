package com.example.ManShop.Controller;

import com.example.ManShop.Entitys.Users;
import com.example.ManShop.JPAs.UserJPA;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UsersController {

    private final Logger log = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    private UserJPA userJPA;

    @GetMapping("/getall")
    public ResponseEntity<?> getUsers() {
        log.info("gọi vào hàm tìm kiếm tất cả sản phẩm");
        return ResponseEntity.ok(userJPA.findAll());
    }

    @GetMapping("/{username}")
    public ResponseEntity<?> getUserById(@PathVariable("username") String username) {
        if(!userJPA.existsById(username)) {
            log.error("không thấy tài khoản" + username);
            return ResponseEntity.notFound().build();
        }
        log.info("đã tìm thấy sản phẩm với tài khoản " +username);
        return ResponseEntity.ok(userJPA.findById(username).get());
    }

    @GetMapping("/{page}/{limit}")
    public ResponseEntity<?> GetByPage(@PathVariable("page") Integer page,
                                      @PathVariable("limit")Integer limit) {
        System.out.println("goi vao ham phan trang");
        System.out.println("page");
        if (page > 0) {
            Pageable setpage = PageRequest.of(page, limit);
            return ResponseEntity.ok(userJPA.findAll(setpage).stream());
        } else {
            Pageable setpage = PageRequest.of(0, limit);
            return ResponseEntity.ok(userJPA.findAll(setpage).stream());
        }
    }

    @PutMapping("/{username}")
    public ResponseEntity<Object> insert(@PathVariable("username") String username,
                                    @RequestBody Users users) {
        Optional<Users> usersOptional = userJPA.findById(username);
        if (usersOptional.isEmpty()) {
            log.error("không thấy tài khoản" + username);
            return ResponseEntity.notFound().build();
        }
        users.setUsername(username);
        userJPA.save(users);
        log.info("cập nhật tài khoản thành công " +username);
        return ResponseEntity.noContent().build();
    }
}
