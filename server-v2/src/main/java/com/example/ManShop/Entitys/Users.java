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
@Table(name = "Users")
public class Users {
    @Id
    private String username;
    @Column(name = "fullname", columnDefinition = "NVARCHAR(200)")
    private String fullname;
    @Column(name = "email")
    private String email;
    @Column(name = "photo")
    private String photo;
    @Column(name = "phone")
    private String phone;
    @Column(name = "activated")
    private Boolean activated;
    @Column(name = "verificode", length = 64)
    @JsonIgnore
    private String verificode;
    @Column(name = "password")
    @JsonIgnore
    private String password;
    @ManyToOne
    @JoinColumn(name = "role")
    private Role roles;

    @OneToMany(mappedBy = "user")
    private List<Address> addressList;

    @OneToMany(mappedBy = "createdUser")
    @JsonIgnore
    private List<StatusDetail> statusDetailList;

    @OneToMany(mappedBy = "createdUser")
    @JsonIgnore
    private List<PaymentDetail> paymentDetailList;

    @OneToMany(mappedBy = "users")
    @JsonIgnore
    private List<Orders> ordersList;
}
