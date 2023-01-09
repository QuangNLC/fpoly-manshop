package com.example.ManShop.Controller;

import com.example.ManShop.DTOS.*;
import com.example.ManShop.Entitys.*;
import com.example.ManShop.JPAs.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin("*")

@RequestMapping("/api/order")
public class OrderController {

    private final Logger log = LoggerFactory.getLogger(OrderController.class);

    @Autowired
    private OrdersJPA ordersJPA;

    @Autowired
    private PaymentJPA paymentJPA;

    @Autowired
    private UsersJPA usersJPA;

    @Autowired
    private StatusDetailJPA statusDetailJPA;

    @Autowired
    private OrderDetailJPA orderDetailJPA;

    @Autowired
    private ProductSizeJPA productSizeJPA;

    @Autowired
    private SizesJPA sizesJPA;

    @Autowired
    private ColorsJPA colorsJPA;

    @Autowired
    private StatusOrderJPA statusOrderJPA;

    @Autowired
    private PaymentDetailJPA paymentDetailJPA;


    @Autowired
    private ProductJPA productJPA;

    @Autowired
    private OrderNotiJPA orderNotiJPA;

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @PostMapping("/checkout")
    @Transactional
    public ResponseEntity<?> checkOut(@RequestBody CheckoutRequestDTO orderRequest){
        log.info("Gọi vào quá trình CHECK OUT ");
        System.out.println(orderRequest);
        Orders newOrder = new Orders();
        Users user = new Users();
        user.setUsername(orderRequest.getUsername());
        // set default status
        StatusOrder sttOrder = new StatusOrder();
        sttOrder.setId(1);
        newOrder.setOrderStatus(sttOrder);
        newOrder.setOrderType(orderRequest.getOrderType());
        //set payinfo
        newOrder.setTotalPrice(orderRequest.getTotalPrice());
        newOrder.setCreatedAt(new Date());
        newOrder.setUpdatedAt(new Date());
        newOrder.setUsers(user);
        newOrder.setDiscount(orderRequest.getDiscount());
        newOrder.setRefund(orderRequest.getRefund());
        newOrder.setSurcharge(orderRequest.getSurcharge());
        newOrder.setOrderDetail(orderRequest.getOrderDetail());
        newOrder.setShipfee(orderRequest.getShipFee());

        //set customer info
        newOrder.setNote(orderRequest.getNote());
        newOrder.setFullname(orderRequest.getFullname());
        newOrder.setPhone(orderRequest.getPhone());
        newOrder.setCityName(orderRequest.getCityName());
        newOrder.setCityCode(orderRequest.getCityCode());
        newOrder.setDistrictName(orderRequest.getDistrictName());
        newOrder.setDistrictCode(orderRequest.getDistrictCode());
        newOrder.setWardName(orderRequest.getWardName());
        newOrder.setWardCode(orderRequest.getWardCode());
        newOrder.setLocation(orderRequest.getLocation());
        //set default paymentstatus
        Payment payment = new Payment();
        payment.setId(3);
        newOrder.setPaymenStatus(payment);
        //save order
        Orders responseOrder = ordersJPA.save(newOrder);

        //add to status timeline
        StatusDetail sttdetail = new StatusDetail();
        sttdetail.setCreatedAt(new Date());
        sttdetail.setOrderStatus(sttOrder);
        sttdetail.setCreatedUser(usersJPA.findById("admin").get());
        sttdetail.setDescription("Tạo đơn hàng.");
        sttdetail.setOrders(responseOrder);
        statusDetailJPA.save(sttdetail);
        Orders orderForDetail = new Orders();
        orderForDetail.setId(responseOrder.getId());
        List<OrderDetail> orderDetails = orderRequest.getOrderDetail();
//        orderDetails.forEach(detail -> {
//            detail.setOrders(orderForDetail);
//
//                orderDetailJPA.save(detail);
//        });
        for(int i=0; i< orderDetails.size();i++){
            OrderDetail element= orderDetails.get(i);
            element.setOrders((orderForDetail));
            int a= element.getQuantity();
            int b = element.getProduct().getId();
            String c = element.getSize();
            try {
                ProductSize update = productSizeJPA.findBySize_IdAndProduct_Id(sizesJPA.findByTitle(element.getSize()).getId(),b);
                update.setId(update.getId());
                update.setQuantity(update.getQuantity()-a);
                productSizeJPA.save(update);
                orderDetailJPA.save(element);
            }catch (Exception e){
                e.printStackTrace();
                return ResponseEntity.status(420).body("lỗi khi trừ số lượng sản phẩm");
            }
        }


        if(orderRequest.getOrderType().toLowerCase().equalsIgnoreCase("giao hàng")){
            OrderNoti o = new OrderNoti();
            o.setCreatedat(new Date());
            o.setMessage(orderRequest.getFullname() + " Đã tạo đơn hàng mới.");
            o.setStatus(false);
            o.setOrderId(responseOrder.getId());
            String link = "/admin/order/" + responseOrder.getId();
            o.setNavigateLink(link);
            OrderNoti savedNoti = orderNotiJPA.save(o);
            AdmOrderNotiResponseDTO resNoti = new AdmOrderNotiResponseDTO();
            List<OrderNoti> resList = new ArrayList<>();
            resList.add(savedNoti);
            resNoti.setList(resList);
            resNoti.setCount(orderNotiJPA.getUnseenNotiCount());
            System.out.println("save noti");
            simpMessagingTemplate.convertAndSend("/noti/adm-order",resNoti);
        }

        return ResponseEntity.ok().body(responseOrder.getId());

//        return ResponseEntity.ok().body("test");
    }




    @GetMapping("/{id}")
    public ResponseEntity<?> findbyid(@PathVariable("id") Integer id){
        log.info(" goi vao ham tìm kiếm order với (id)= "+id);
        if(!ordersJPA.existsById(id)){
            log.error("Không tìm thấy order (id)= "+id);
            return ResponseEntity.notFound().build();
        }else{
            return ResponseEntity.ok(ordersJPA.findById(id));
        }
    }

    @GetMapping("/getall")
    public ResponseEntity<?> getall(){
        log.info("gọi vào hàm tìm kiếm tất cả các order");
        return ResponseEntity.ok(ordersJPA.findAll());
    }


    @Transactional
    @PutMapping("/update-status/{id}")
    public ResponseEntity<?> updateOrderStatus(@PathVariable("id") Integer id, @RequestBody UpdateOrderStatusRequestDTO requestDTO){
        log.info("Cập nhập đơn hàng với số đơn hàng (id)= "+ id);
        if(!ordersJPA.existsById(id)){
            return ResponseEntity.badRequest().body("Không tìm thấy đơn hàng với id()"+id);
        }
        else if(!statusOrderJPA.existsById(requestDTO.getStatusOrderId())){
            return ResponseEntity.badRequest().body("Không tìm thấy trạng thái đơn hàng với id()"+requestDTO.getStatusOrderId());
        }else if(!usersJPA.existsById(requestDTO.getUpdatedUser())){
            return ResponseEntity.badRequest().body("Không tìm thấy tài khoản với uesrname"+requestDTO.getUpdatedUser());
        }else{
            Orders order = ordersJPA.findById(id).get();
            StatusOrder newStatus = statusOrderJPA.findById(requestDTO.getStatusOrderId()).get();
            order.setOrderStatus(newStatus);
            ordersJPA.save(order);
            StatusDetail newStatusDetail = new StatusDetail();
            Users users = usersJPA.findById(requestDTO.getUpdatedUser()).get();
            newStatusDetail.setOrderStatus(newStatus);
            newStatusDetail.setCreatedAt(new Date());
            newStatusDetail.setOrders(order);
            newStatusDetail.setDescription(requestDTO.getDescription());
            newStatusDetail.setCreatedUser(users);
            statusDetailJPA.save(newStatusDetail);
        }
        return ResponseEntity.ok(ordersJPA.findById(id).get());
    }

    @PutMapping("/update-order-info/{id}")
    public ResponseEntity<?> updateOrderInfo(@PathVariable("id") Integer id, @RequestBody UpdateOrderInfoRequestDTO requestDTO){
        if(!ordersJPA.existsById(id)){
            return ResponseEntity.badRequest().body("Không tìm thấy đơn hàng với id()"+id);
        }else if(!usersJPA.existsById(requestDTO.getUpdatedUser())){
            return ResponseEntity.badRequest().body("Không tìm thấy tài khoản với uesrname"+requestDTO.getUpdatedUser());
        }else{
            Orders orders = ordersJPA.findById(id).get();
            orders.setFullname(requestDTO.getFullname());
            orders.setPhone(requestDTO.getPhone());
            orders.setCityName(requestDTO.getCityName());
            orders.setCityCode(requestDTO.getCityCode());
            orders.setDistrictName(requestDTO.getDistrictName());
            orders.setDistrictCode(requestDTO.getDistrictCode());
            orders.setWardName(requestDTO.getWardName());
            orders.setWardCode(requestDTO.getWardCode());
            orders.setLocation(requestDTO.getLocation());
            orders.setShipfee(requestDTO.getShipfee());
            ordersJPA.save(orders);

            StatusDetail newStatusDetail = new StatusDetail();
            Users users = usersJPA.findById(requestDTO.getUpdatedUser()).get();
            newStatusDetail.setOrderStatus(statusOrderJPA.findById(7).get());
            newStatusDetail.setCreatedAt(new Date());
            newStatusDetail.setOrders(orders);
            newStatusDetail.setDescription(
                    "Chỉnh sửa thông tin giao hàng: "+"["+requestDTO.getFullname()+"]"
                    +" Số điện thoại: [ " +requestDTO.getPhone() +" ] "
                    + " - " + requestDTO.getLocation() + " - " + requestDTO.getWardName() + " - " + requestDTO.getDistrictName() + " - "+ requestDTO.getCityName()
            );
            newStatusDetail.setCreatedUser(users);
            statusDetailJPA.save(newStatusDetail);
        }
        return ResponseEntity.ok(ordersJPA.findById(id).get());
    }

    @PutMapping("/update-payment-info/{id}")
    public ResponseEntity<?> updateOrderInfo(@PathVariable("id") Integer id, @RequestBody UpdateOrderPaymentInfoRequestDTO requestDTO){
        if(!ordersJPA.existsById(id)){
            return ResponseEntity.badRequest().body("Không tìm thấy đơn hàng với id()"+id);
        }else if(!usersJPA.existsById(requestDTO.getUpdatedUser())){
            return ResponseEntity.badRequest().body("Không tìm thấy tài khoản với uesrname"+requestDTO.getUpdatedUser());
        }else{
            Orders orders = ordersJPA.findById(id).get();
            Payment payment = paymentJPA.findById(requestDTO.getPaymentId()).get();
            orders.setPaymenStatus(payment);
            ordersJPA.save(orders);
            PaymentDetail newPaymentDetail = new PaymentDetail();
            Users users = usersJPA.findById(requestDTO.getUpdatedUser()).get();
            newPaymentDetail.setPaymentStatus(payment);
            newPaymentDetail.setCreatedAt(new Date());
            newPaymentDetail.setOrders(orders);
            newPaymentDetail.setDescription(requestDTO.getDescription());
            newPaymentDetail.setCreatedUser(users);
            newPaymentDetail.setPaymentRefund(requestDTO.getPaymentRefund());
            newPaymentDetail.setPaymentType(requestDTO.getPaymenttype());
            newPaymentDetail.setPaymentFee(requestDTO.getPaymentfee());
            paymentDetailJPA.save(newPaymentDetail);
        }
        return ResponseEntity.ok(ordersJPA.findById(id).get());
    }

    @PutMapping("/update-cart-item/{id}")
    @Transactional
    public ResponseEntity<?> updateOrderCartItem(@PathVariable("id") Integer id, @RequestBody UpdateOrderCartItemRequestDTO requestDTO){
        if(!ordersJPA.existsById(requestDTO.getOrderId())){
            return ResponseEntity.badRequest().body("Không tìm thấy đơn hàng với id: "+requestDTO.getOrderId());
        }else if(!usersJPA.existsById(requestDTO.getUpdatedUser())){
            return ResponseEntity.badRequest().body("Không tìm thấy tài khoản với uesrname"+requestDTO.getUpdatedUser());
        }else if(!orderDetailJPA.existsById((id))){
            return ResponseEntity.badRequest().body("Không tìm thấy order detail id: "+id);
        }

        OrderDetail orderDetail = orderDetailJPA.findById(id).get();
        try {
            ProductSize update = productSizeJPA.findBySize_IdAndProduct_Id(requestDTO.getSizeId(), orderDetail.getProduct().getId());
            update.setId(update.getId());
            update.setQuantity(update.getQuantity() + orderDetail.getQuantity() - requestDTO.getQuantity());
            orderDetail.setQuantity(requestDTO.getQuantity());
            productSizeJPA.save(update);
            orderDetailJPA.save(orderDetail);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(420).body("lỗi khi trừ số lượng sản phẩm");
        }
        StatusDetail newStatusDetail = new StatusDetail();
        Users users = usersJPA.findById(requestDTO.getUpdatedUser()).get();
        newStatusDetail.setOrderStatus(statusOrderJPA.findById(7).get());
        newStatusDetail.setCreatedAt(new Date());
        newStatusDetail.setOrders(ordersJPA.findById(requestDTO.getOrderId()).get());
        newStatusDetail.setDescription(
                "Cập nhật số lượng sản phẩm: "+"["+orderDetail.getProduct().getName()+"]"
                        +" Mã SP: [ " +orderDetail.getProduct().getId() +" ] "
                        + " - " + "x " + requestDTO.getQuantity() +" sản phẩm."
        );
        newStatusDetail.setCreatedUser(users);
        statusDetailJPA.save(newStatusDetail);


        return ResponseEntity.ok(ordersJPA.findById(requestDTO.getOrderId()).get());
    }

    @PutMapping("/delete-cart-item/{id}")
    @Transactional
    public ResponseEntity<?> deleteOrderCartItem(@PathVariable("id") Integer id, @RequestBody UpdateOrderCartItemRequestDTO requestDTO){
        if(!ordersJPA.existsById(requestDTO.getOrderId())){
            return ResponseEntity.badRequest().body("Không tìm thấy đơn hàng với id()"+requestDTO.getOrderId());
        }else if(!usersJPA.existsById(requestDTO.getUpdatedUser())){
            return ResponseEntity.badRequest().body("Không tìm thấy tài khoản với uesrname"+requestDTO.getUpdatedUser());
        }else if(!orderDetailJPA.existsById((id))){
            return ResponseEntity.badRequest().body("Không tìm thấy order detail id: "+id);
        }

        OrderDetail orderDetail = orderDetailJPA.findById(id).get();
        try {
            ProductSize update = productSizeJPA.findBySize_IdAndProduct_Id(requestDTO.getSizeId(), orderDetail.getProduct().getId());
            update.setId(update.getId());
            update.setQuantity(update.getQuantity() + orderDetail.getQuantity());
            productSizeJPA.save(update);
            orderDetailJPA.deleteById(id);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(420).body("lỗi khi trừ số lượng sản phẩm");
        }
        StatusDetail newStatusDetail = new StatusDetail();
        Users users = usersJPA.findById(requestDTO.getUpdatedUser()).get();
        newStatusDetail.setOrderStatus(statusOrderJPA.findById(7).get());
        newStatusDetail.setCreatedAt(new Date());
        newStatusDetail.setOrders(ordersJPA.findById(requestDTO.getOrderId()).get());
        newStatusDetail.setDescription(
                "Xóa sản phẩm: "+"["+orderDetail.getProduct().getName()+"]"
                        +" Mã SP: [ " +orderDetail.getProduct().getId() +" ] "
                        + " - " + "Khỏi giỏ hàng"
        );
        newStatusDetail.setCreatedUser(users);
        statusDetailJPA.save(newStatusDetail);


        return ResponseEntity.ok(ordersJPA.findById(requestDTO.getOrderId()).get());
    }

    @PostMapping("/create/cart-item/{id}")
    @Transactional
    public ResponseEntity<?> createOrderCartItem(@PathVariable("id") Integer id, @RequestBody CreateCartItemRequestDTO requestDTO){
        if(!ordersJPA.existsById(id)){
            return ResponseEntity.badRequest().body("Không tìm thấy đơn hàng với id()"+id);
        }else if(!usersJPA.existsById(requestDTO.getUpdatedUser())){
            return ResponseEntity.badRequest().body("Không tìm thấy tài khoản với uesrname"+requestDTO.getUpdatedUser());
        }else if(!productJPA.existsById(requestDTO.getProductId())){
            return ResponseEntity.badRequest().body("Không tìm thấy sản phẩm với id: "+requestDTO.getProductId());
        }

        OrderDetail newOrder = new OrderDetail();
        newOrder.setOrders(ordersJPA.findById(id).get());
        newOrder.setQuantity(requestDTO.getQuantity());
        newOrder.setSize(requestDTO.getSize());
        newOrder.setPrice(requestDTO.getPrice());
        newOrder.setPrDiscount(requestDTO.getDiscount());
        newOrder.setStatus(true);
        newOrder.setProduct(productJPA.findById(requestDTO.getProductId()).get());
        try {
            ProductSize update = productSizeJPA.findBySize_IdAndProduct_Id(requestDTO.getSizeId(), requestDTO.getProductId());
            update.setId(update.getId());
            update.setQuantity(update.getQuantity()- requestDTO.getQuantity());
            productSizeJPA.save(update);
            orderDetailJPA.save(newOrder);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(420).body("lỗi khi trừ số lượng sản phẩm");
        }
        StatusDetail newStatusDetail = new StatusDetail();
        Users users = usersJPA.findById(requestDTO.getUpdatedUser()).get();
        newStatusDetail.setOrderStatus(statusOrderJPA.findById(7).get());
        newStatusDetail.setCreatedAt(new Date());
        newStatusDetail.setOrders(ordersJPA.findById(id).get());
        newStatusDetail.setDescription(
                "Thêm sản phẩm: "+"["+newOrder.getProduct().getName()+"]"
                        +" Mã SP: [ " +newOrder.getProduct().getId() +" ] "
                        + " - " + "x" + newOrder.getQuantity()
        );
        newStatusDetail.setCreatedUser(users);
        statusDetailJPA.save(newStatusDetail);


        return ResponseEntity.ok(ordersJPA.findById(id).get());
    }


    @GetMapping("/order-noti")
    public ResponseEntity<?> getOrderNotiList(){
        AdmOrderNotiResponseDTO res = new AdmOrderNotiResponseDTO();
        res.setList(orderNotiJPA.findAll());
        res.setCount(orderNotiJPA.getUnseenNotiCount());
        return  ResponseEntity.ok(res);
    }

    @GetMapping("/seen-noti")
    public ResponseEntity<?> seenNotiByAdm(){
        orderNotiJPA.seenNotiByAdm();
        return ResponseEntity.ok("Seen noti");
    }


}
