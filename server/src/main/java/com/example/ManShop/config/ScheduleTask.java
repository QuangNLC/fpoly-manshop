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

    @Scheduled(cron = "59 * * * * *")
    @Async
    @Bean
    public void reportCurrentTime() {
        log.info("The time is now {}", dateFormat.format(new Date()));
//        Promotions pr =promotionJPA.findById(2).get();
        System.out.println("he e");

    }
}
