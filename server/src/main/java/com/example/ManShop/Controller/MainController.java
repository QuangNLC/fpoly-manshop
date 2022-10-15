package com.example.ManShop.Controller;

import com.example.ManShop.JPAs.CustomerJPA;
import com.example.ManShop.JPAs.OrderDetailJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("main")
public class MainController {
    @Autowired
    OrderDetailJPA orderDetailJPA;
    @Autowired
    CustomerJPA customerJPA;
 //   @GetMapping("/test")
    public void Test(){
//        System.out.println("test");
//        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("uuuu/MM/dd HH:mm:ss");
//        LocalDateTime now = LocalDateTime.now();
//        System.out.println(dtf.format(now));

        List<String> list = new ArrayList<String>();
        list.add("Java");
        list.add("C++");
        list.add("PHP");
        for (int i =0 ; i< list.size();i++){
            System.out.println(i);
        }
//        return  null;
    }

    public static void main(String args[]) {
        List<String> list = new ArrayList<String>();
        list.add("Java");
        list.add("C++");
        list.add("PHP");
        for (String s : list) {
            String a = s+" ssss";
            System.out.println(a);
        }
        }
    }

