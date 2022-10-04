package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
public interface UserJPA extends JpaRepository<Users,String> {
}
