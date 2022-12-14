package com.example.ManShop.Controller;

import com.example.ManShop.DTOS.JwtRespone;
import com.example.ManShop.DTOS.LoginRequest;
import com.example.ManShop.DTOS.OrderStatusRequest;
import com.example.ManShop.DTOS.RegisterRequest;
import com.example.ManShop.Entitys.*;
import com.example.ManShop.JPAs.*;
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
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final Logger log = LoggerFactory.getLogger(AuthController.class);


    final AuthenticationManager authenticationManager;
    final UserJPA userJPA;
    final RolesJPA rolesJPA;
    final PasswordEncoder passwordEncoder;
    final JwtUtils jwtUtils;
    final OrderJPA orderJPA;

    @Autowired
    private CitysJPA citysJPA;
    @Autowired
    private DistrictsJPA districtsJPA;
    @Autowired
    private WardsJPA wardsJPA;

    public AuthController(AuthenticationManager authenticationManager, UserJPA userJPA, RolesJPA rolesJPA, PasswordEncoder passwordEncoder, JwtUtils jwtUtils, OrderJPA orderJPA) {
        this.authenticationManager = authenticationManager;
        this.userJPA = userJPA;
        this.rolesJPA = rolesJPA;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
        this.orderJPA = orderJPA;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> login (@RequestBody LoginRequest loginRequest){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsIpml userDetails = (UserDetailsIpml) authentication.getPrincipal();
        String jwt = jwtUtils.generateJwtToken(userDetails);

        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        System.out.println("thoong tin :" +authentication + " jwt" +jwt);
        return ResponseEntity.ok(new JwtRespone(jwt,
                userDetails.getUsername(),
                roles));
        //    return ResponseEntity.ok("login thanh cong (token)=: "+jwt);
    }


    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request){
        log.info("G???i v??o h??m ????ng k?? ng?????i d??ng v???i d??? li???u t??? client:" +request);
        int defaurole =3;
        if (userJPA.existsById(request.getUsername())){
            log.error("(Username) = " + request.getUsername() + " ???? ???????c s??? d???ng!");
            return ResponseEntity.badRequest().body("Username da duoc su dung, hay nhap lai!");
        }
        if(userJPA.existsByEmail(request.getEmail())){
            log.error("(Email) = " + request.getEmail() +" ???? ???????c s??? d???ng");
            return ResponseEntity.badRequest().body("Email ???? ???????c s??? d???ng");
        }
        Users users = new Users();
        users.setUsername(request.getUsername());
        users.setFullname(request.getFullname());
        users.setEmail(request.getEmail());
        users.setPhone(request.getPhone());
        users.setPhoto("default-avt.jpg");
        users.setActivated(true);
        users.setVerificode(RandomString.make(64));
        users.setPassword(passwordEncoder.encode(request.getPassword()));
        Role roles = rolesJPA.findById(3).get();
        users.setRoles(roles);
        Address address = new Address();
        Citys city = new Citys();
        Districts district = new Districts();
        Wards ward = new Wards();
        city.setId(request.getCityId());
        district.setId(request.getDistrictId());
        ward.setId(request.getWardId());
        address.setCity(city);
        address.setDistrict(district);
        address.setWard(ward);
        address.setLocation(request.getLocation());
        users.setAddress(address);
        userJPA.save(users);


        return ResponseEntity.ok(users);
    }
    @PutMapping("/adm-update/{username}/{idrole}")
    public ResponseEntity<?> updateuser(@PathVariable("username") String username,@PathVariable("idrole") Integer idrole){
        log.info("g???i v??o h??m update th??ng tin ng?????i d??ng");
        try {
            Users users = userJPA.findById("username").get();
            users.setRoles(rolesJPA.findById(idrole).get());
            userJPA.save(users);
            return ResponseEntity.ok(users);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        }


    }


    @PostMapping("/adm-register")
    public ResponseEntity<?> registerByAdmin(@Valid @RequestBody RegisterRequest request){
        log.info("G???i v??o h??m ????ng k?? ng?????i d??ng v???i d??? li???u t??? client:" +request);
        if (userJPA.existsById(request.getUsername())){
            log.error("(Username) = " + request.getUsername() + " ???? ???????c s??? d???ng!");
            return ResponseEntity.badRequest().body("Username da duoc su dung, hay nhap lai!");
        }
        if(userJPA.existsByEmail(request.getEmail())){
            log.error("(Email) = " + request.getEmail() +" ???? ???????c s??? d???ng");
            return ResponseEntity.badRequest().body("Email ???? ???????c s??? d???ng");
        }
        Users users = new Users();
        users.setUsername(request.getUsername());
        users.setFullname(request.getFullname());
        users.setEmail(request.getEmail());
        users.setPhone(request.getPhone());
        users.setPhoto("default-avt.jpg");
        users.setActivated(true);
        users.setVerificode(RandomString.make(64));
        users.setPassword(passwordEncoder.encode(request.getPassword()));
        Role roles = rolesJPA.findById(request.getRole()).get();
        users.setRoles(roles);
        Address address = new Address();
        // config address
        Citys city = citysJPA.findById(1).get();
        Districts district = districtsJPA.findById(134).get();
        Wards ward = wardsJPA.findById(Long.parseLong("2182")).get();
        address.setCity(city);
        address.setDistrict(district);
        address.setWard(ward);
        address.setLocation(request.getLocation());
        users.setAddress(address);
        userJPA.save(users);


        return ResponseEntity.ok(users);
    }
}
