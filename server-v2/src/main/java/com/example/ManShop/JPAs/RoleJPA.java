package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.Categories;
import com.example.ManShop.Entitys.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleJPA extends JpaRepository<Role,Integer> {
}
