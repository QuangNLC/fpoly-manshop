package com.example.ManShop.Controller;

import com.example.ManShop.Entitys.OrderDetail;
import com.example.ManShop.Service.StatisticService;
import lombok.RequiredArgsConstructor;
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
    private final StatisticService statisticService;

    @GetMapping("/admin/{startDate}/{endDate}")
    public ResponseEntity<List<OrderDetail>> getOrderDetail(@PathVariable("startDate") Date startDate,
                                                            @PathVariable("endDate") Date endDate) {
        return new ResponseEntity<>(statisticService.getOrderDetailByDate(startDate, endDate), HttpStatus.OK);
    }
}
