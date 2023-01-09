package com.example.ManShop.Controller;

import com.example.ManShop.DTOS.JwtResponseDTO;
import com.example.ManShop.DTOS.LoginRequestDTO;
import com.example.ManShop.DTOS.RegisterRequestDTO;
import com.example.ManShop.Entitys.Address;
import com.example.ManShop.Entitys.Role;
import com.example.ManShop.Entitys.Users;
import com.example.ManShop.JPAs.RoleJPA;
import com.example.ManShop.JPAs.UsersJPA;
import com.example.ManShop.security.JwtUtils;
import com.example.ManShop.security.UserDetailsIpml;
import net.bytebuddy.utility.RandomString;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final Logger log = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private UsersJPA usersJPA;

    @Autowired
    private RoleJPA roleJPA;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequestDTO request){
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
        Role roles = roleJPA.findById(3).get();
        users.setRoles(roles);
        usersJPA.save(users);


        return ResponseEntity.ok(users);
    }

    @PostMapping("/signin")
    public ResponseEntity<?> login (@RequestBody LoginRequestDTO loginRequest){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsIpml userDetails = (UserDetailsIpml) authentication.getPrincipal();
        String jwt = jwtUtils.generateJwtToken(userDetails);

        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        System.out.println("thoong tin :" +authentication + " jwt" +jwt);
        return ResponseEntity.ok(new JwtResponseDTO(jwt,
                userDetails.getUsername(),
                roles));
    }

}
