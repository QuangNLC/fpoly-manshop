package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.Users;
<<<<<<< HEAD
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
=======
>>>>>>> 59f1d885e5b8656b016cf5f13d2e4770eeb8a7b6
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

<<<<<<< HEAD
public interface UserJPA extends JpaRepository<Users,String> {
    Page<Users> findAll(Pageable pageable);
=======
@EnableJpaRepositories
public interface UserJPA extends JpaRepository<Users,String> {
>>>>>>> 59f1d885e5b8656b016cf5f13d2e4770eeb8a7b6
}
