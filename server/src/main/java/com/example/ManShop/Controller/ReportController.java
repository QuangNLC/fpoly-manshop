package com.example.ManShop.Controller;

import com.example.ManShop.DTOS.RevenueStatisticsResponeDTO;
import com.example.ManShop.JPAs.OrderJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/report")
public class ReportController {
@Autowired
    OrderJPA orderJPA;
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

}
