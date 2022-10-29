package com.example.ManShop.Controller;

import com.example.ManShop.Entitys.OrderDetail;
import com.example.ManShop.Service.StatisticService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;
import java.util.List;

@RestController
@RequestMapping("/api/statistics")
@RequiredArgsConstructor
public class StatisticController {
    private final Logger log = LoggerFactory.getLogger(OrderContoller.class);
    private final StatisticService statisticService;

    @GetMapping("/admin/{page}/{limit}/{startDate}/{endDate}")
    public ResponseEntity<List<OrderDetail>> getOrderDetail(@PathVariable("page") Integer page,
                                                            @PathVariable("limit")Integer limit,
                                                            @PathVariable("startDate") Date startDate,
                                                            @PathVariable("endDate") Date endDate) {
        Pageable pageable;
        if (page > 0) {
            pageable = PageRequest.of(page, limit);
        } else {
            pageable = PageRequest.of(0, limit);
        }
        return new ResponseEntity<>(statisticService.getOrderDetailByDate(pageable,startDate, endDate), HttpStatus.OK);
    }
}
