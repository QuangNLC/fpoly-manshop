package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.Role;
import com.example.ManShop.Entitys.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersJPA extends JpaRepository<Users,String> {
    Boolean existsByEmail(String email);
}
