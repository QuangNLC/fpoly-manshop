package com.example.ManShop.Entitys;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "Payment")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "title", columnDefinition = "NVARCHAR(200)")
    private String title;


    @OneToMany(mappedBy = "paymenStatus")
    @JsonIgnore
    private List<Orders> listOrders;

    @OneToMany(mappedBy = "paymentStatus")
    @JsonIgnore
    private List<PaymentDetail> listPaymentDetail;
}
