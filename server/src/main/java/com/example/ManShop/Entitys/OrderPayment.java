package com.example.ManShop.Entitys;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Data
@Entity
@NoArgsConstructor
@ToString
@AllArgsConstructor
@Table(name = "OrderPayment")
public class OrderPayment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer  id;
@Column(name = "decriptions" ,columnDefinition = "NVARCHAR(200)")
    private String Decriptions;

    @ManyToOne
    @JoinColumn(name = "payment")
    private Payment payment;
    @JsonIgnore
    @ManyToOne @JoinColumn(name = "orders")
    private Orders orders;
}
