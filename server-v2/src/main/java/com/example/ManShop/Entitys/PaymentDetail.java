package com.example.ManShop.Entitys;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@ToString
@AllArgsConstructor
@Table(name = "PaymentOrderDetail")
public class PaymentDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name="paymentid")
    private Payment paymentStatus;
    @Column(name ="paymentfee")
    private double paymentFee;
    @Column(name ="paymenttype", columnDefinition = "NVARCHAR(200)")
    private String paymentType;
    @Column(name ="paymentrefund")
    private Boolean paymentRefund;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "OrderID")
    private Orders orders;
    @Column(name = "Description", columnDefinition = "NVARCHAR(500)")
    private String description;
    @Column(name = "createdat")
    private Date createdAt;
    @Column(name = "updatedat")
    private Date updatedAt;
    @ManyToOne
    @JoinColumn(name = "username")
    private Users createdUser;
}
