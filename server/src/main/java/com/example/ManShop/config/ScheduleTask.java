package com.example.ManShop.config;


import com.example.ManShop.Entitys.Promotions;
import com.example.ManShop.JPAs.PromotionJPA;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
@EnableScheduling

public class ScheduleTask {

    final PromotionJPA promotionJPA;

    private static final Logger log = LoggerFactory.getLogger(ScheduleTask.class);

    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

    public ScheduleTask(PromotionJPA promotionJPA) {
        this.promotionJPA = promotionJPA;
    }

    @Scheduled(cron = "57 59 23 * * *")
    @Async
    @Bean
    public void checkDateStartPromotions(){
        log.info("__________________Check Date Start---------------");
        List<Promotions> list = promotionJPA.ListFromStartDate(new Date());
        for (Promotions p : list) {
            p.setIsactive(true);
            promotionJPA.save(p);
            log.info("bắt đầu  chương trình khuyến mãi (id): "+p.getId());
        }
        log.info("__________________End check Start________________");
    }
    @Scheduled(cron = "57 59 23 * * *")
    @Async
    @Bean
    public void checkDateEndPromotions(){
        log.info("___________________Check Date End_________________");
        List<Promotions> list = promotionJPA.ListFromEndDate(new Date());
        for (Promotions p : list) {
            p.setIsactive(false);
            promotionJPA.save(p);
            log.info("đã kết thúc chương trình khuyến mãi (id): "+p.getId());
        }
        log.info("__________________End Check Start________________");
    }

}
