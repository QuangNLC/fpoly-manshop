package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface AddressJPA extends JpaRepository<Address, Integer> {

    @Modifying
    @Transactional
    @Query(
            value = "update Address a  set a.isDefault = false ")
    int clearDefaultAddress();
}
