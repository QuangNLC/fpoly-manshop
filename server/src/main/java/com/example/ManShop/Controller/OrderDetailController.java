package com.example.ManShop.Controller;

import com.example.ManShop.Entitys.OrderDetail;
import com.example.ManShop.Service.OrderDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/order-detail")
@RequiredArgsConstructor
public class OrderDetailController {
    private final OrderDetailService statisticService;

    @GetMapping("/admin/{page}/{limit}/{startDate}/{endDate}")
    public ResponseEntity<List<OrderDetail>> getOrderDetailByDate(@PathVariable("page") Integer page,
                                                                  @PathVariable("limit")Integer limit,
                                                                  @PathVariable("startDate") Date startDate,
                                                                  @PathVariable("endDate") Date endDate) {
        Pageable pageable;
        if (page > 0) {
            pageable = PageRequest.of(page, limit);
        } else {
            pageable = PageRequest.of(0, limit);
        }
        return new ResponseEntity<>(statisticService.getOrderDetailByDate
                (pageable,startDate, endDate), HttpStatus.OK);
    }

    @GetMapping("/client/{page}/{limit}/{username}/{startDate}/{endDate}")
    public ResponseEntity<List<OrderDetail>> getOrderDetailByDateAndUsername(@PathVariable("page") Integer page,
                                                                             @PathVariable("limit")Integer limit,
                                                                             @PathVariable("username") String username,
                                                                             @PathVariable("startDate") Date startDate,
                                                                             @PathVariable("endDate") Date endDate) {
        Pageable pageable;
        if (page > 0) {
            pageable = PageRequest.of(page, limit);
        } else {
            pageable = PageRequest.of(0, limit);
        }
        return new ResponseEntity<>(statisticService.getOrderDetailByDateAndUsername
                (pageable, username, startDate, endDate), HttpStatus.OK);
    }
}
