package com.example.ManShop.Controller;


import com.example.ManShop.Entitys.Citys;
import com.example.ManShop.Entitys.Districts;
import com.example.ManShop.Entitys.Wards;
import com.example.ManShop.JPAs.CitysJPA;
import com.example.ManShop.JPAs.DistrictsJPA;
import com.example.ManShop.JPAs.WardsJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/address")
@CrossOrigin("*")
public class AdressController {

    @Autowired
    private CitysJPA citysJPA;

    @Autowired
    private DistrictsJPA districtsJPA;

    @Autowired
    private WardsJPA wardsJPA;

    @PostMapping("/citys-json-to-sql-data")
    public ResponseEntity<?> changeCitysJsonToSqlData(@RequestBody List<Citys> jsonData){
        System.out.println(jsonData);
        jsonData.forEach(city -> {
            citysJPA.save(city);
        });
        return ResponseEntity.ok().build();
    }

    @PostMapping("/districts-json-to-sql-data/{districtsId}")
    public ResponseEntity<?> changeDistrictsJsonToSqlData(@PathVariable Integer districtsId, @RequestBody List<Districts> jsonData){
        System.out.println(districtsId);
        System.out.println(jsonData);
        if(!citysJPA.existsById(districtsId)){
            return  ResponseEntity.notFound().build();
        }else{
            jsonData.forEach(district -> {
                Districts newDistrict = new Districts();
                Citys thisCity = citysJPA.findById(districtsId).get();
                newDistrict.setCity(thisCity);
                newDistrict.setTitle(district.getTitle());
                Districts savedDistrict = districtsJPA.save(newDistrict);
                district.getWards().forEach(ward -> {
                    Wards newWard = new Wards();
                    newWard.setDistrict(savedDistrict);
                    newWard.setTitle(ward.getTitle());
                    wardsJPA.save(newWard);
                });
            });
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping("/data")
    public ResponseEntity<?> getVietNamCityData(){
        return ResponseEntity.ok(citysJPA.findAll());
    }

}
