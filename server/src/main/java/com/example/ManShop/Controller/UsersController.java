package com.example.ManShop.Controller;

import com.example.ManShop.DTOS.ChangePasswordDTO;
import com.example.ManShop.DTOS.ChangepassDTO;
import com.example.ManShop.DTOS.RegisterRequest;
import com.example.ManShop.Entitys.*;
import com.example.ManShop.JPAs.UserJPA;
import com.example.ManShop.Service.EmailService;
import net.bytebuddy.utility.RandomString;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.websocket.server.PathParam;
import java.util.Optional;
import java.util.Random;

import com.example.ManShop.Service.FileService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/users")
public class UsersController {



    private final Logger log = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    private UserJPA userJPA;

    @Autowired
    private FileService fileService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/getall")
    public ResponseEntity<?> getUsers() {
        log.info("gọi vào hàm tìm kiếm tất cả user");
        return ResponseEntity.ok(userJPA.findAll());
    }

    @GetMapping()
    public ResponseEntity<?> getUserById(@PathParam("username") String username) {
        if(!userJPA.existsById(username)) {
            log.error("không thấy tài khoản" + username);
            return ResponseEntity.notFound().build();
        }
        log.info("đã tìm thấy  tài khoản voi username: " +username);
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
    @PreAuthorize("isAuthenticated()")
    @PutMapping()
    public ResponseEntity<Users> insert(@PathParam("username") String username,
                                        @RequestBody Users users) {
        Optional<Users> usersOptional = userJPA.findById(username);
        if (usersOptional.isEmpty()) {
            log.error("không thấy tài khoản" + username);
            return ResponseEntity.notFound().build();
        }
        Users newUser =  usersOptional.get();
        newUser.setFullname(users.getFullname());
        newUser.setPhone(users.getPhone());
        Address newAddress = users.getAddress();
        System.out.println(newAddress);
        newUser.setAddress(newAddress);
        Users resUser = userJPA.save(newUser);
        log.info("cập nhật tài khoản thành công " +username);
        return ResponseEntity.ok(resUser);
    }
    @PreAuthorize("isAuthenticated()")
    @DeleteMapping()
    public ResponseEntity<Void> delete(@PathParam("username") String username){
        Optional<Users> usersOptional = userJPA.findById(username);
        if (usersOptional.isEmpty()) {
            log.error("không thấy tài khoản" + username);
            return ResponseEntity.notFound().build();
        }
        try{
            userJPA.deleteById(username);
            log.info("xoa' tài khoản thành công ");
            return ResponseEntity.ok().build();
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping ("/update-avatar/{username}")
    public ResponseEntity<?> updateUserAvatar(@PathVariable(value = "username") String username ,@PathParam("file") MultipartFile[] file){

        if(!userJPA.existsById(username)){
            return ResponseEntity.notFound().build();
        }else{
            Users user = userJPA.findById(username).get();
            if(user.getPhoto().equals("default-avt.jpg")){
                String  newPhoto  = fileService.save("images",file).get(0);
                user.setPhoto(newPhoto);
                return ResponseEntity.ok(userJPA.save(user));
            }
            fileService.delete("images",user.getPhoto());
            String  newPhoto  = fileService.save("images",file).get(0);
            user.setPhoto(newPhoto);
            return ResponseEntity.ok(userJPA.save(user));
        }

//        return ResponseEntity.ok(username);
    }


    @PostMapping("/change-password/{username}")
    public ResponseEntity<?> changePassword(@PathVariable(value="username") String  username,@RequestBody ChangePasswordDTO req){
        if(!userJPA.existsById(username)){
            return  ResponseEntity.notFound().build();
        }else{
            Users user =  userJPA.findById(username).get();
            if(passwordEncoder.matches(req.getPassword(), user.getPassword())){
                user.setPassword(passwordEncoder.encode(req.getNewPassword()));
                userJPA.save(user);
                return ResponseEntity.ok("Đổi mật khẩu thành công!");
            }else{
                return ResponseEntity.badRequest().build();
            }
        }

//        return ResponseEntity.ok("Đổi mật khẩu thành công!");
    }
    @Autowired
    private EmailService emailService;
    @PostMapping("/forgot-password/{email}")
    public ResponseEntity<?> forgotPassword(@PathVariable(value="email") String  email){
        if(!userJPA.existsByEmail(email)){
            return  ResponseEntity.status(404).body("không tim thấy tài khoản nào khớp với email trong hệ thống");
        }else{
//            int leftLimit = 97; // letter 'a'
//            int rightLimit = 122; // letter 'z'
//            int len = 10;
//            Random random = new Random();
//            String generatedString = random.ints(leftLimit, rightLimit + 1)
//                    .limit(len)
//                    .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
//                    .toString();
//            System.out.println(generatedString);
            Users user =  userJPA.findByEmail(email);
//            user.setPassword(passwordEncoder.encode(generatedString));
//            userJPA.save(user);
            EmailDetails e= new EmailDetails();
            e.setRecipient(user.getEmail());
            e.setMgsBody("Thông tin tài khoản của quý khách"+"\n"
                    +"                   Tài khoản : "+user.getUsername() +"\n"
                    +"                   Ma kich hoat : " +user.getVerificode()+"\n"
                    +" Truy câp vap trang : http://localhost:3000/forgot-password/");
            emailService.sendSimpleleMail(e);
            return ResponseEntity.ok("đã gửi mã kích hoạt vui lòng kiểm tra  mail");
        }
    }

    @PutMapping("/changepass")
    public ResponseEntity<?> forgotPassword(@RequestBody ChangepassDTO changepassDTO) {
        if (!userJPA.existsByVerificode(changepassDTO.getCode())) {
            return ResponseEntity.status(404).body("Khong tim thay !!!!");
        }
        Users u = userJPA.findByVerificode(changepassDTO.getCode());
        u.setPassword(passwordEncoder.encode(changepassDTO.getNewpass()));
        u.setVerificode(RandomString.make(64));
        try {
            userJPA.save(u);
            return ResponseEntity.ok("thay doi mat khau thanh cong");
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }

    }

}
