package com.example.ManShop.Controller;

import com.example.ManShop.DTOS.RPResponeseDTO;
import com.example.ManShop.DTOS.RPResquestDTO;
import com.example.ManShop.DTOS.RevenueStatisticsResponeDTO;
import com.example.ManShop.JPAs.OrderDetailJPA;
import com.example.ManShop.JPAs.OrderDetailStatusJPA;
import com.example.ManShop.JPAs.OrderJPA;
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
    @Autowired
    OrderDetailStatusJPA orderDetailStatusJPA;

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
        List<RPResquestDTO> objectList = orderDetailStatusJPA.getRPE();
        int ckeck1 =0;
        int ckeck2 =0;
        int ckeck3 =0;
        int ckeck4 =0;
        int ckeck5 =0;
        for (RPResquestDTO a: objectList) {
            if(a.getTitle().equals("Chờ Xác Nhận")){
                int check1=ckeck1 ++;
            }if(a.getTitle().equals("Đã Xác Nhận")){
                int check2=ckeck2 ++;
            }if(a.getTitle().equals("Đang Giao")){
                int check3=ckeck3 ++;
            }if(a.getTitle().equals("Hoàn Tất")){
                int check4=ckeck4 ++;
            }if(a.getTitle().equals("Đang Chờ")){
                int check5=ckeck5 ++;
            }
        }
        List<RPResponeseDTO> rpDTO = new ArrayList<>();
        rpDTO.add(new RPResponeseDTO("Chờ Xác Nhận",ckeck1));
        rpDTO.add(new RPResponeseDTO("Đã Xác Nhận",ckeck2));
        rpDTO.add(new RPResponeseDTO("Đang Giao",ckeck3));
        rpDTO.add(new RPResponeseDTO("Hoàn Tất",ckeck4));
        rpDTO.add(new RPResponeseDTO("Đang Chờ",ckeck5));
        return ResponseEntity.ok(rpDTO);
    }

    @GetMapping("/order-today")
    public Integer reportOrderToday(){
        if(orderJPA.today(dateFormat.format(new Date())) ==null){
            return 0;
        }
        return orderJPA.today(dateFormat.format(new Date()));
    }
    @GetMapping("/product-Month")
    public Integer reportProduct(){
        if(orderDetailJPA.getsll(dateFormat.format(new Date())) ==null){
            return 0;
        }
        return orderDetailJPA.getsll(dateFormat2.format(new Date()));
    }

    @GetMapping("/totalprice-today")
    public Integer reporttotalday() {
        if(orderJPA.pricetoday(dateFormat.format(new Date())) ==null){
            return 0;
        }
        return orderJPA.pricetoday(dateFormat.format(new Date()));
    }
//    @GetMapping("/")
}
