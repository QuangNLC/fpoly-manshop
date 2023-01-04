package com.example.ManShop.Controller;


import com.example.ManShop.Entitys.Address;
import com.example.ManShop.Entitys.Users;
import com.example.ManShop.JPAs.AddressJPA;
import com.example.ManShop.JPAs.UsersJPA;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.ManShop.DTOS.CreateAddressDTO;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/address")
public class AddressController {
    private final Logger log = LoggerFactory.getLogger(AddressController.class);

    @Autowired
    private AddressJPA addressJPA;

    @Autowired
    private UsersJPA usersJPA;

    @PostMapping("create-address")
    private ResponseEntity<Address> createNewAddress(@RequestBody CreateAddressDTO request){
        System.out.println(request);
        if(!usersJPA.existsById(request.getUsername())){
            return ResponseEntity.notFound().build();
        }
        Address newAddress = new Address();
        newAddress.setName(request.getName());
        newAddress.setPhone(request.getPhone());
        newAddress.setCityName(request.getCityName());
        newAddress.setCityCode(request.getCityCode());
        newAddress.setDistrictName(request.getDistrictName());
        newAddress.setDistrictCode(request.getDistrictCode());
        newAddress.setWardName(request.getWardName());
        newAddress.setWardCode(request.getWardCode());
        newAddress.setLocation(request.getLocation());
        Users u = new Users();
        u.setUsername(request.getUsername());
        newAddress.setUser(u);
        newAddress.setIsDefault(false);
//        set another address default to false
        Address savedAddress = addressJPA.save(newAddress);
        return ResponseEntity.ok(savedAddress);
    }
}
