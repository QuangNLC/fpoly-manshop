package com.example.ManShop.JPAs;

import com.example.ManShop.Entitys.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressJPA extends JpaRepository<Address, Integer> {
}
