package com.example.ManShop.Controller;

import com.example.ManShop.DTOS.OrderRequestDTO;
import com.example.ManShop.Entitys.*;
import com.example.ManShop.JPAs.CustomerJPA;
import com.example.ManShop.JPAs.OrderDetailJPA;
import com.example.ManShop.JPAs.OrderJPA;
import com.example.ManShop.JPAs.UserJPA;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/order")
public class OrderContoller {
    private final Logger log = LoggerFactory.getLogger(OrderContoller.class);
    final
    UserJPA userJPA;
    final
    CustomerJPA customerJPA;
    final
    OrderDetailJPA orderDetailJPA;
    final
    OrderJPA orderJPA;

    public OrderContoller(UserJPA userJPA, CustomerJPA customerJPA, OrderDetailJPA orderDetailJPA, OrderJPA orderJPA) {
        this.userJPA = userJPA;
        this.customerJPA = customerJPA;
        this.orderDetailJPA = orderDetailJPA;
        this.orderJPA = orderJPA;
    }


    @GetMapping("/all")
    public ResponseEntity<?> getall(){
        log.info("gọi vào hàm tìm kiếm tất cả các order");
        return ResponseEntity.ok(orderJPA.findAll());
    }

    @GetMapping("/all/{page}/{limit}")
    public ResponseEntity<?> GetByPage(@PathVariable("page") Integer page,@PathVariable("limit")Integer limit){
        Pageable setpage;
        int ix= page -1;
        log.info("gọi vào hàm phân trang order với số (page)= "+ix +" số phần tử (limit)= "+limit);
        System.out.println(ix);
        System.out.println(limit);
        if(ix <0  ){
            setpage = PageRequest.of(0, limit);
        }else{
            setpage = PageRequest.of(ix, limit);
        }
        return ResponseEntity.ok(orderJPA.findAll(setpage).stream());
    }



    @GetMapping("/{id}")
    public ResponseEntity<?> findbyid(@PathVariable("id") Integer id){
        log.info(" goi vao ham tìm kiếm order với (id)= "+id);
        if(!orderJPA.existsById(id)){
            log.error("Không tìm thấy order (id)= "+id);
            return ResponseEntity.notFound().build();
        }else{
            return ResponseEntity.ok(orderJPA.findById(id));
        }
    }
    @PostMapping("/checkout/{check}")
    public ResponseEntity<?> checkOUT(@RequestBody OrderRequestDTO orderRequest,@PathVariable("check") String check){

        log.info("Gọi vào quá trình CHECK OUT ");
        Orders newOrder = new Orders();
        Users user = new Users();
        user.setUsername(orderRequest.getUsers().getUsername());

    if(check.equals("for-someone")){
        Customers customers  = new Customers();
        customers.setCustomerInfor(orderRequest.getCustomers().getCustomerInfor());
        customers.setAddress(orderRequest.getCustomers().getAddress());
        customers.setPhone(orderRequest.getCustomers().getPhone());
        customers.setUser(orderRequest.getUsers());
         customerJPA.save(customers);
        newOrder.setCustomers(customers);
    }if(check.equals("for-me")){
        newOrder.setCustomers(null);
    }
        StatusOrder sttOrder = new StatusOrder();
        sttOrder.setId(1);
        newOrder.setStatusOrders(sttOrder);
        newOrder.setUsers(user);
        newOrder.setTotal_price(orderRequest.getTotal_price());
        newOrder.setOrder_date(new Date());
        newOrder.setCreatedDate(new Date());
        newOrder.setOrderDetail(orderRequest.getOrderDetail());
        Orders responseOrder = orderJPA.save(newOrder);
        Orders orderForDetail = new Orders();
        orderForDetail.setId(responseOrder.getId());
        List<OrderDetail> orderDetails = orderRequest.getOrderDetail();
        orderDetails.forEach(detail -> {
            detail.setOrders(orderForDetail);
            orderDetailJPA.save(detail);
        });
        return ResponseEntity.ok().body("tao don hang thanh cong");
    }

    @GetMapping("/my-order/{username}/{page}/{limit}")
    public ResponseEntity<?> getmyorder(@PathVariable("username") String username,@PathVariable("page") Integer page,@PathVariable("limit") Integer limit){
        Pageable setpage;
        int ix= page -1;
        log.info("gọi vào hàm phân trang order với số (page)= "+ix +" số phần tử (limit)= "+limit);
        if(ix <0  ){
            setpage = PageRequest.of(0, limit);
        }else{
            setpage = PageRequest.of(ix, limit);
        }
        return ResponseEntity.ok(orderJPA.findByUsers_Username(setpage,username));
    }

}
