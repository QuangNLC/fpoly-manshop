package com.example.ManShop.Controller;

import com.example.ManShop.DTOS.RevenueStatisticsResponeDTO;
import com.example.ManShop.JPAs.OrderDetailJPA;
import com.example.ManShop.JPAs.OrderJPA;
import com.example.ManShop.JPAs.ProductJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/report")
public class ReportController {
    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("YYYY-MM-dd");
    private static final SimpleDateFormat dateFormat2 = new SimpleDateFormat("YYYY-MM");
@Autowired
    OrderJPA orderJPA;

    @Autowired
    OrderDetailJPA orderDetailJPA;
    @GetMapping("/turnover/{year}")
    public ResponseEntity<?> reprotTurnover(@PathVariable("year") Integer year){
        List<RevenueStatisticsResponeDTO> list = new ArrayList<>();
        List<RevenueStatisticsResponeDTO> pt = orderJPA.getTest(year);
        list.add(new RevenueStatisticsResponeDTO(1,0.0));
        list.add(new RevenueStatisticsResponeDTO(2,0.0));
        list.add(new RevenueStatisticsResponeDTO(3,0.0));
        list.add(new RevenueStatisticsResponeDTO(4,0.0));
        list.add(new RevenueStatisticsResponeDTO(5,0.0));
        list.add(new RevenueStatisticsResponeDTO(6,0.0));
        list.add(new RevenueStatisticsResponeDTO(7,0.0));
        list.add(new RevenueStatisticsResponeDTO(8,0.0));
        list.add(new RevenueStatisticsResponeDTO(9,0.0));
        list.add(new RevenueStatisticsResponeDTO(10,0.0));
        list.add(new RevenueStatisticsResponeDTO(11,0.0));
        list.add(new RevenueStatisticsResponeDTO(12,0.0));
        for(int i= 0;i<pt.size();i++){
            RevenueStatisticsResponeDTO check = pt.get(i);
            for (int j =0; j< list.size();j++){
                if(j+1 == check.getMonth()){
                    list.set(j,check);
                }
            }
        }
        return ResponseEntity.ok(list);
    }

    @GetMapping("/order-statistic")
    public ResponseEntity<?> reportOrder(){



        return null;
    }

    @GetMapping("/order-today")
    public Integer reportOrderToday(){
        return orderJPA.today(dateFormat.format(new Date()));
    }
    @GetMapping("/product-Month")
    public Integer reportProduct(){
        return orderDetailJPA.getsll(dateFormat2.format(new Date()));
    }
}
