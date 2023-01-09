package com.example.ManShop.Controller;

import com.example.ManShop.DTOS.RegisterRequestDTO;
import com.example.ManShop.Entitys.Role;
import com.example.ManShop.Entitys.Users;
import com.example.ManShop.JPAs.RoleJPA;
import com.example.ManShop.JPAs.UsersJPA;
import net.bytebuddy.utility.RandomString;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.websocket.server.PathParam;
import java.util.Date;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/users")
public class UsersController {
    private final Logger log = LoggerFactory.getLogger(UsersController.class);

    @Autowired
    private UsersJPA usersJPA;

    @Autowired
    private RoleJPA roleJPA;

    @Autowired
    private PasswordEncoder passwordEncoder;

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

    @PutMapping("/update-activated/{username}")
    public ResponseEntity<?> updateUserActivatedd(@PathVariable("username") String username,@PathParam("activated") Integer activated){
        if(!usersJPA.existsById(username)) {
            log.error("không thấy tài khoản" + username);
            return ResponseEntity.notFound().build();
        }

        Users user = usersJPA.findById(username).get();
        if(activated > 0){
            user.setActivated(true);
        }else{
            user.setActivated(false);
        }

        return  ResponseEntity.ok(usersJPA.save(user));
    }

    @PostMapping("/create-by-adm")
    public ResponseEntity<?> register( @RequestBody RegisterRequestDTO request){
        log.info("Gọi vào hàm đăng kí người dùng với dữ liệu từ client:" +request);
        int defaurole =3;
        if (usersJPA.existsById(request.getUsername())){
            log.error("(Username) = " + request.getUsername() + " đã được sử dụng!");
            return ResponseEntity.badRequest().body("Username da duoc su dung, hay nhap lai!");
        }
        if(usersJPA.existsByEmail(request.getEmail())){
            log.error("(Email) = " + request.getEmail() +" đã được sử dụng");
            return ResponseEntity.badRequest().body("Email đã được sử dụng");
        }
        Users users = new Users();
        users.setUsername(request.getUsername());
        users.setFullname(request.getFullname());
        users.setEmail(request.getEmail());
        users.setPhone(request.getPhone());
        users.setPhoto("default-avt.jpg");
        users.setActivated(true);
        users.setCreatedAt(new Date());
        users.setVerificode(RandomString.make(64));
        users.setPassword(passwordEncoder.encode(request.getPassword()));
        if(request.getIsAdmin()){
            Role roles = roleJPA.findById(1).get();
            users.setRoles(roles);
        }else{
            Role roles = roleJPA.findById(3).get();
            users.setRoles(roles);
        }
        usersJPA.save(users);


        return ResponseEntity.ok(users);
    }


}
