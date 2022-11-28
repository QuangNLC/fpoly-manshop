package com.example.ManShop.Controller;

import com.example.ManShop.DTOS.AdmOrderNotiDTO;
import com.example.ManShop.DTOS.OrderRequestDTO;
import com.example.ManShop.DTOS.PageOrderRespone;
import com.example.ManShop.Entitys.*;
import com.example.ManShop.JPAs.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import com.example.ManShop.DTOS.OrderListResquestDTO;
@RestController
@CrossOrigin("*")

@RequestMapping("/api/order")
public class OrderContoller {
    private final Logger log = LoggerFactory.getLogger(OrderContoller.class);
    final UserJPA userJPA;
    final CustomerJPA customerJPA;
    final OrderDetailJPA orderDetailJPA;
    final OrderJPA orderJPA;
    final ProductsizeJPA productsizeJPA;
    final SizeJPA sizeJPA;
    @Autowired
    private StatusOrderJPA statusOrderJPA;
    @Autowired
    private AddressJPA addressJPA;

    @Autowired
    private OrderNotiJPA orderNotiJPA;

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    public OrderContoller(UserJPA userJPA, CustomerJPA customerJPA, OrderDetailJPA orderDetailJPA, OrderJPA orderJPA, ProductsizeJPA productsizeJPA, SizeJPA sizeJPA) {
        this.userJPA = userJPA;
        this.customerJPA = customerJPA;
        this.orderDetailJPA = orderDetailJPA;
        this.orderJPA = orderJPA;
        this.productsizeJPA = productsizeJPA;
        this.sizeJPA = sizeJPA;
    }
    //    @GetMapping("/all")
//    public ResponseEntity
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
        List<Orders> resList = orderJPA.findAll(setpage).stream().collect(Collectors.toList());
        Integer totalItems = orderJPA.findAll().stream().collect(Collectors.toList()).size()%limit == 0 ? orderJPA.findAll().stream().collect(Collectors.toList()).size()/limit : orderJPA.findAll().stream().collect(Collectors.toList()).size()/limit+1;
        PageOrderRespone response = new PageOrderRespone(resList,limit,page,totalItems);
        return ResponseEntity.ok(response);
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
        System.out.println(orderRequest);
        Orders newOrder = new Orders();
        Users user = new Users();
        user.setUsername(orderRequest.getUsers().getUsername());
//        if(check.equals("for-someone")){
//        Customers customers  = new Customers();
//        customers.setPhone(orderRequest.getCustomers().getPhone());
//        customers.setAddress(orderRequest.getCustomers().getAddress());
//        customers.setName(orderRequest.getCustomers().getName());
//        customers.setUser(orderRequest.getUsers());
//        customerJPA.save(customers);
//        newOrder.setCustomers(customers);
//        }
        if(check.equals("for-me")){
            Customers customers  = new Customers();
            Address address = new Address();
            Citys city = new Citys();
            Districts district = new Districts();
            Wards ward = new Wards();
            System.out.println("check");
            city.setId(orderRequest.getCityId());
            district.setId(orderRequest.getDistrictId());
            ward.setId(orderRequest.getWardId());
            address.setCity(city);
            address.setDistrict(district);
            address.setWard(ward);
            address.setLocation(orderRequest.getLocation());
            System.out.println(address);
            Address savedAddress = addressJPA.save(address);
            customers.setAddress(savedAddress);
            customers.setPhone(orderRequest.getCustomers().getPhone());
            customers.setName(orderRequest.getCustomers().getName());
            customers.setUser(orderRequest.getUsers());
            customerJPA.save(customers);
            newOrder.setCustomers(customers);
        }else
        {
            return ResponseEntity.status(404).body("khong tim thay gi b oi!!");
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

        OrderNoti o = new OrderNoti();
        o.setCreatedat(new Date());
        o.setMessage(orderRequest.getUsers().getUsername()+"Da tao don hang moi");
        o.setStatus(false);
        o.setOrderId(responseOrder.getId());
        OrderNoti savedNoti = orderNotiJPA.save(o);
        AdmOrderNotiDTO resNoti = new AdmOrderNotiDTO();
        List<OrderNoti> resList = new ArrayList<>();
        resList.add(savedNoti);
        resNoti.setList(resList);
        resNoti.setCount(orderNotiJPA.getUnseenNotiCount());
        System.out.println("save noti");
        simpMessagingTemplate.convertAndSend("/noti/adm-order",resNoti);
        return ResponseEntity.ok().body("tao don hang thanh cong voi (id)= " +responseOrder.getId());
    }

    @GetMapping("/my-order/{username}/{page}/{limit}")
    public ResponseEntity<?> getmyorder(@PathVariable("username") String username,@PathVariable("page") Integer page,@PathVariable("limit") Integer limit){
        Pageable setpage;
        Pageable pagedefault = PageRequest.of(0,1000000);
        int ix= page -1;
        log.info("gọi vào hàm phân trang order với số (page)= "+ix +" số phần tử (limit)= "+limit);
        if(ix <0  ){
            setpage = PageRequest.of(0, limit);
        }else{
            setpage = PageRequest.of(ix, limit);
        }
        List<Orders> resList = orderJPA.findByUsers_Username(setpage,username).stream().collect(Collectors.toList());
        Integer totalItems = orderJPA.findByUsers_Username(pagedefault,username).stream().collect(Collectors.toList()).size()%limit == 0 ? orderJPA.findByUsers_Username(pagedefault,username).stream().collect(Collectors.toList()).size()/limit : orderJPA.findByUsers_Username(pagedefault,username).stream().collect(Collectors.toList()).size()/limit+1;
        PageOrderRespone response = new PageOrderRespone(resList,limit,page,totalItems);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/my-orders")
    public ResponseEntity<List<Orders>> getMyOrders(@RequestParam("username") String username){
        Pageable pagedefault = PageRequest.of(0,1000000);
        List<Orders> resList = orderJPA.findByUsers_Username(pagedefault,username).stream().collect(Collectors.toList());
        return ResponseEntity.ok(resList);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateOrder(@PathVariable("id") Integer id, @RequestBody Orders orders){
        log.info("Cập nhập đơn hàng với số đơn hàng (id)= "+ id);
        if(!orderJPA.existsById(id)){
            return ResponseEntity.badRequest().body("Không tìm thấy đơn hàng với id()"+id);
        }else {
            try {
                orders.setId(id);
                orderJPA.save(orders);
                System.out.println(orders);
                int checkorder =orders.getStatusOrders().getId();
                if(checkorder == 4){
                    log.info("Đơn hàng với (id)= "+ id +" đã được kết thúc!");
                    List<OrderDetail> orderDetaillist = orders.getOrderDetail();
                    System.out.println("chua check");
                    for(int i=0; i< orderDetaillist.size();i++){
                        OrderDetail element= orderDetaillist.get(i);
                        int a= element.getQuantity();
                        int b = element.getProduct().getId();
                        String c = element.getSize();
                        try {
                            ProductSize update = productsizeJPA.findBySize_IdAndProduct_Id(check(c),b);
                            update.setId(update.getId());
                            update.setQuantity(update.getQuantity()-a);
                            productsizeJPA.save(update);
                        }catch (Exception e){
                            e.printStackTrace();
                            return ResponseEntity.status(420).body("lỗi khi trừ số lượng sản phẩm");
                        }
                    }

                }
            }catch (Exception e){
                System.out.println("loi tai ham cap nhap danh sach Order!!!");
                e.printStackTrace();
                return ResponseEntity.notFound().build();
            }

        }        return ResponseEntity.ok("cập nhập thành công order với (id)= " +id);
    }
    @PutMapping()
    private int check(String b) {
        switch (b){
            case "XS":
                int i;
                return  i=1;
            case "S":
                int i1;
                return  i1=2;
            case "M":
                int i2;
                return  i2=3;
            case "L":
                int i3;
                return  i3=4;
            case "XL":
                int i4;
                return  i4=5;
            case "XXL":
                int i5;
                return  i5=6;
            default:
                return 0;
        }
    }


    @GetMapping("/info-list-order-update")
    public ResponseEntity<?> getlistOrderToUpdate(){
        return ResponseEntity.ok(orderJPA.findlistOrderId());
    }


    @PutMapping("/update/list-order")
    public ResponseEntity<?> updateOrderList(@RequestBody OrderListResquestDTO listOrder){
        log.info("gọi vào hàm update trạng thái 1 danh sách order");
        if(listOrder.getIntegerList().size() <0  ){
            return ResponseEntity.notFound().build();
        }else {
            // List<Orders> ordersListbystatus = orderJPA.findlistOrderId(listOrder.getIntegerList());
            //System.out.println(listOrder.getIntegerList().size());
            try {
                for (int i =0; i< listOrder.getIntegerList().size();i++){
                    Orders ordersUpdte = orderJPA.findById(listOrder.getIntegerList().get(i)).get();
                    ordersUpdte.setStatusOrders(statusOrderJPA.findById(listOrder.getStstusOrder()).get());
                    orderJPA.save(ordersUpdte);
                }
            }catch (Exception e){
                e.printStackTrace();
                return ResponseEntity.notFound().build();
            }

        }
        return ResponseEntity.ok("cập nhập thành công");
    }
    @GetMapping("/status-info")
    public ResponseEntity<?> getOrderStatusInfo(){
        return ResponseEntity.ok(statusOrderJPA.findAll());
    }


    @GetMapping("/order-noti")
    public ResponseEntity<?> getOrderNotiList(){
        AdmOrderNotiDTO res = new AdmOrderNotiDTO();
        res.setList(orderNotiJPA.findAll());
        res.setCount(orderNotiJPA.getUnseenNotiCount());
        return  ResponseEntity.ok(res);
    }

    @GetMapping("/seen-noti")
    public ResponseEntity<?> seenNotiByAdm(){
        orderNotiJPA.seenNotiByAdm();

        return ResponseEntity.ok("Seen noti");
    }

//    @PostMapping("/create-wating-order")
//    public ResponseEntity<?> createWatingOrder(){
//        Orders newOrder = new Orders();
//        newOrder.setCreatedDate(new Date());
//        StatusOrder stt = new StatusOrder();
//        stt.setId(5);
//        newOrder.setStatusOrders(stt);
//
//    }
    @GetMapping("/wating-order")
    public ResponseEntity<?> getWatingOrder(){
        return  ResponseEntity.ok(orderJPA.findWaitingOrders());
    }
}
