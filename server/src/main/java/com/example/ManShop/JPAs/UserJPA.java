package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

public interface UserJPA extends JpaRepository<Users,String> {
    Page<Users> findAll(Pageable pageable);
    Boolean existsByEmail(String email);
}
//@EnableJpaRepositories
//public interface UserJPA extends JpaRepository<Users,String> {
//}
