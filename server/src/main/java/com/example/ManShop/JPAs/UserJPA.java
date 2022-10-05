package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserJPA extends JpaRepository<Users,String> {
    Page<Users> findAll(Pageable pageable);
}
