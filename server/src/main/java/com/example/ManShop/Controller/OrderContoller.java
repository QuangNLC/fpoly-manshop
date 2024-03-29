package com.example.ManShop.Controller;

import com.example.ManShop.DTOS.AdmOrderNotiDTO;
import com.example.ManShop.DTOS.OrderRequestDTO;
import com.example.ManShop.DTOS.PageOrderRespone;
import com.example.ManShop.DTOS.UpDateStatusOrderDTO;
import com.example.ManShop.Entitys.*;
import com.example.ManShop.JPAs.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;
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
    private OrderPaymentJPA orderPaymentJPA;

    @Autowired
    private  PaymentJPA paymentJPA;
    @Autowired
    private StatusOrderJPA statusOrderJPA;
    @Autowired
    private AddressJPA addressJPA;

    @Autowired
    private OrderNotiJPA orderNotiJPA;

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private OrderDetailStatusJPA orderDetailStatusJPA;
    @Autowired
    private CitysJPA citysJPA;
    @Autowired
    private DistrictsJPA districtsJPA;
    @Autowired
    private WardsJPA wardsJPA;

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
        if(check.equals("for-me")){
            Customers customers  = new Customers();
            Address address = new Address();
            Citys city = new Citys();
            Districts district = new Districts();
            Wards ward = new Wards();
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
        newOrder.setTotal_price(orderRequest.getTotal_price());
        newOrder.setOrder_date(new Date());
        newOrder.setCreatedDate(new Date());
        newOrder.setUsers(user);
        newOrder.setReduce_price(orderRequest.getReduce_price());
        newOrder.setOrderDetail(orderRequest.getOrderDetail());
        Orders responseOrder = orderJPA.save(newOrder);

        OrderPayment neworPM = new OrderPayment();
        neworPM.setPayment(paymentJPA.findByTitle(orderRequest.getMethodpayment()));
        neworPM.setOrders(responseOrder);
        neworPM.setDecriptions(orderRequest.getDescriptions_payment());
        orderPaymentJPA.save(neworPM);

        StatusDetail sttdetail = new StatusDetail();
        sttdetail.setFinish(false);
        sttdetail.setTimeDate(new Date());
        sttdetail.setStatusOrder(sttOrder);
        sttdetail.setUsersUpdate(userJPA.findById("admin").get());
        sttdetail.setDescription("chờ xác nhận đặt hàng");
        sttdetail.setOrders(responseOrder);
        orderDetailStatusJPA.save(sttdetail);
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
        //email
//        Users user1 = userJPA.findById(user.getUsername()).get();
//        EmailDetails e= new EmailDetails();
//        System.out.println("check1"+user1.getEmail());
//        e.setRecipient(user1.getEmail());
//        System.out.println("check2");
//        e.setMgsBody("Thông tin đơn hàng của quý khách"+"\n" +
//                "--------------------------------------------------------------------------------------"+ "\n"+
//                "Mã đơn hàng :" +responseOrder.getId()+" Giá tiền : " + responseOrder.getTotal_price() +"\n" +
//                "Trạng thái đơn hàng : (Chờ xác nhận)" + " được tạo vào lúc " + dateFormat.format(new Date()) +"\n" +
//                "Chi tiết truy cập vào trang : http://manshop:3000" +"\n" +
//                "--------------------------------------------------------------------------------------");
//        emailService.sendSimpleleMail(e);
        //
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
    @Transactional
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateOrder(@PathVariable("id") Integer id, @RequestBody UpDateStatusOrderDTO DTO){
        log.info("Cập nhập đơn hàng với số đơn hàng (id)= "+ id);
        String check ="Hoàn Tất";
        Integer[] statusList = {2,3,4};
//        Integer checklistSttus = statusOrderJPA.findByTitle(DTO.getStatusOrder()).getId();
        if(!orderJPA.existsById(id)){
            return ResponseEntity.badRequest().body("Không tìm thấy đơn hàng với id()"+id);
        }
        else {
            try {
                Orders orders = orderJPA.findById(id).get();
                if (DTO.getStatusOrder().equals("Đang chờ") || DTO.getStatusOrder().equals("Chờ Xác Nhận")){
                    if(DTO.getCustomers() != null){
                        Customers customers  = new Customers();
                        Address address = new Address();
                        Citys city = citysJPA.findById(DTO.getCityId()).get();
                        Districts district = districtsJPA.findById(DTO.getDistrictId()).get();
                        Wards ward = wardsJPA.findById(DTO.getWardId()).get();
                        address.setCity(city);
                        address.setDistrict(district);
                        address.setWard(ward);
                        address.setLocation(DTO.getLocation());
                        Address savedAddress = addressJPA.save(address);
                        customers.setAddress(savedAddress);
                        customers.setPhone(DTO.getCustomers().getPhone());
                        customers.setName(DTO.getCustomers().getName());
                        customers.setUser(DTO.getUsers());
                        customerJPA.save(customers);
                        orders.setCustomers(customers);
                    }
                    orders.setTotal_price(DTO.getTotal_price());
                    orders.setReduce_price(DTO.getReduce_price());
                    orderJPA.save(orders);
                    orderDetailJPA.deletelistOrderdetail(orders.getId());
                    Orders orderForDetail = new Orders();
                    orderForDetail.setId(id);
                    List<OrderDetail> orderDetails = DTO.getOrderDetail();
                    orderDetails.forEach(detail -> {
                        detail.setOrders(orderForDetail);
                        orderDetailJPA.save(detail);
                    });
                }
                StatusDetail statusDetail = new StatusDetail();
                statusDetail.setOrders(orders);
                statusDetail.setDescription(DTO.getDescriptionOder());
                statusDetail.setFinish(DTO.getIsFinish());
                statusDetail.setTimeDate(new Date());
                statusDetail.setStatusOrder(statusOrderJPA.findByTitle(DTO.getStatusOrder()));
                statusDetail.setUsersUpdate(DTO.getUsers());
                orderDetailStatusJPA.save(statusDetail);
                ////mail
//                EmailDetails e= new EmailDetails();
//                System.out.println(orders.getUsers().getEmail());
//                e.setRecipient(orders.getUsers().getEmail());
//                e.setMgsBody("Thông tin đơn hàng của quý khách"+"\n" +
//                        "--------------------------------------------------------------------------------------"+ "\n"+
//                        "Mã đơn hàng :" +id+" Giá tiền : " + orders.getTotal_price() +"\n" +
//                        "Trạng thái đơn hàng : ("+DTO.getStatusOrder()+")" + " được tạo vào lúc " + dateFormat.format(new Date()) +"\n" +
//                        "Chi tiết truy cập vào trang : http://manshop:3000" +"\n" +
//                        "--------------------------------------------------------------------------------------");
//                emailService.sendSimpleleMail(e);

                if(DTO.getStatusOrder().equals(check)){
                    log.info("Đơn hàng với (id)= "+ id +" đã được kết thúc!");
                    List<OrderDetail> orderDetaillist = orders.getOrderDetail();
                    System.out.println("chua check");
                    for(int i=0; i< orderDetaillist.size();i++){
                        OrderDetail element= orderDetaillist.get(i);
                        int a= element.getQuantity();
                        int b = element.getProduct().getId();
                        String c = element.getSize();
                        try {
                            ProductSize update = productsizeJPA.findBySize_IdAndProduct_Id(sizeJPA.findByTitle(element.getSize()).getId(),b);
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

        }
//        return ResponseEntity.ok("cập nhập thành công order với (id)= " +id);
        return ResponseEntity.ok(orderJPA.findById(id).get());
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


//    @GetMapping("/info-list-order-update")
//    public ResponseEntity<?> getlistOrderToUpdate(){
//        return ResponseEntity.ok(orderJPA.findlistOrderId());
//    }


    @PutMapping("/update/list-order")
    public ResponseEntity<?> updateOrderList(@RequestBody OrderListResquestDTO listOrder){
        log.info("gọi vào hàm update trạng thái 1 danh sách order");
        if(listOrder.getIntegerList().size() <0  ){
            return ResponseEntity.notFound().build();
        }else {
            // List<Orders> ordersListbystatus = orderJPA.findlistOrderId(listOrder.getIntegerList());
            //System.out.println(listOrder.getIntegerList().size());
            try {
//                for (int i =0; i< listOrder.getIntegerList().size();i++){
//                    Orders ordersUpdte = orderJPA.findById(listOrder.getIntegerList().get(i)).get();
//                    ordersUpdte.setStatusOrders(statusOrderJPA.findById(listOrder.getStstusOrder()).get());
//                    orderJPA.save(ordersUpdte);
//                }
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

//    @PostMapping("/checkout/waiting")
//@PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_STAFF')")
//    public ResponseEntity<?> waiting(@RequestBody OrderRequestDTO orderRequestDTO){
//        log.info("Tạo 1 hóa đơn chờ  ");
//        Orders newOrder = new Orders();
//        Users user = new Users();
//        user.setUsername(orderRequestDTO.getUsers().getUsername());
//        try {
//            newOrder.setUsers(user);
//            StatusOrder sttOrder = new StatusOrder();
//            sttOrder.setId(5);
//            newOrder.setStatusOrders(sttOrder);
//            newOrder.setCustomers(customerJPA.findById(1).get());
//            newOrder.setOrder_date(new Date());
//            newOrder.setCreatedDate(new Date());
//            orderJPA.save(newOrder);
//            return ResponseEntity.ok().body(newOrder.getId());
//            return null;
//        }catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.notFound().build();
//        }
//    }


    @PostMapping("/checkout/waiting")
//@PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_STAFF')")
    public ResponseEntity<?> waiting(@RequestBody UpDateStatusOrderDTO DTO){
        log.info("Tạo 1 hóa đơn chờ  ");
        Orders newOrder = new Orders();
        Users user = new Users();
        user.setUsername(DTO.getUsers().getUsername());
        try {
            newOrder.setUsers(user);
            newOrder.setCustomers(customerJPA.findById(1).get());
            newOrder.setOrder_date(new Date());
            newOrder.setCreatedDate(new Date());
            orderJPA.save(newOrder);
            OrderPayment neworpm = new OrderPayment();
            neworpm.setOrders(newOrder);
            neworpm.setPayment(paymentJPA.findByTitle("Tại cửa hàng"));
            neworpm.setDecriptions("đơn hàng được thanh toán tại quầy!!");
            orderPaymentJPA.save(neworpm);

            StatusDetail statusDetail = new StatusDetail();
            statusDetail.setOrders(newOrder);
            statusDetail.setDescription("hóa đơn tạo tại quầy");
            statusDetail.setFinish(false);
            statusDetail.setTimeDate(new Date());
//            statusDetail.setStatusOrder(statusOrderJPA.findByTitle(DTO.getStatusOrder()));
//            statusDetail.setUsersUpdate(DTO.getUsers());
            statusDetail.setStatusOrder(statusOrderJPA.findById(5).get());
            statusDetail.setUsersUpdate(user);
            orderDetailStatusJPA.save(statusDetail);
            return ResponseEntity.ok().body(orderJPA.findById(newOrder.getId()).get());
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        }
    }

    @Transactional
    @PutMapping("/update/waiting/{id}")
    public ResponseEntity<?> updateCheckoutWt(@RequestBody OrderRequestDTO orderRequestDTO,@PathVariable("id")Integer id){
        Orders  newOrder = orderJPA.findById(id).get();
        //  newOrder.setStatusOrders(orderRequestDTO.getStatusOrders());
        log.info("Gọi vào hàm update đơn hàng ");
        if (!orderJPA.existsById(id)){
            return ResponseEntity.status(404).body("lỗi : không tìm thấy đơn hàng với (id)= " +id);
        }else{
            try {
                if(orderRequestDTO.getCustomers() != null){
                    Customers customers  = new Customers();
                    Address address = new Address();
                    Citys city = citysJPA.findById(orderRequestDTO.getCityId()).get();
                    Districts district = districtsJPA.findById(orderRequestDTO.getDistrictId()).get();
                    Wards ward = wardsJPA.findById(orderRequestDTO.getWardId()).get();
                    address.setCity(city);
                    address.setDistrict(district);
                    address.setWard(ward);
                    address.setLocation(orderRequestDTO.getLocation());
                    Address savedAddress = addressJPA.save(address);
                    customers.setAddress(savedAddress);
                    customers.setPhone(orderRequestDTO.getCustomers().getPhone());
                    customers.setName(orderRequestDTO.getCustomers().getName());
                    customers.setUser(orderRequestDTO.getUsers());
                    customerJPA.save(customers);
                    newOrder.setCustomers(customers);
                }
                newOrder.setTotal_price(orderRequestDTO.getTotal_price());
                orderJPA.save(newOrder);
                orderDetailJPA.deletelistOrderdetail(newOrder.getId());
                Orders orderForDetail = new Orders();
                orderForDetail.setId(id);
                List<OrderDetail> orderDetails = orderRequestDTO.getOrderDetail();
                orderDetails.forEach(detail -> {
                    detail.setOrders(orderForDetail);
                    orderDetailJPA.save(detail);
                });

            }catch (Exception e){
                return ResponseEntity.notFound().build();
            }


            return ResponseEntity.ok().body(orderJPA.findById(id));
        }
    }

//    @GetMapping("/wating-order")
//    public ResponseEntity<?> getWatingOrder(){
//        return  ResponseEntity.ok(orderJPA.findWaitingOrders());
//    }
//@Scheduled(fixedRate = 10*1000, initialDelay = 5000)
//public void run(){
//    int success =0, error = 0;
//    while (!queue1.isEmpty() && queue.size() > 0){
//        MimeMessage message = queue.remove(0);
//        SimpleMailMessage m = queue1.remove(0);
//        try{
//            javaMailSender.send(m);
//            javaMailSender.send(message);
//            success++;
//        }catch(Exception e){
//            error++;
//        }
//        System.out.printf(">> Send: %d, Error: %d\r\n", success, error);
//    }
//}
}