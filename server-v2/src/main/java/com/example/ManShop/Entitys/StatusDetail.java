package com.example.ManShop.Entitys;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;
@Entity
@Data
@NoArgsConstructor
@ToString
@AllArgsConstructor
@Table(name = "StatusOrderDetail")
public class StatusDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "StatusID")
    private StatusOrder orderStatus;
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
