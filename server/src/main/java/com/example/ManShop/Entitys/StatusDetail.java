//package com.example.ManShop.Entitys;
//
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import lombok.ToString;
//
//import javax.persistence.Column;
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Id;
//import javax.persistence.JoinColumn;
//import javax.persistence.ManyToOne;
//import javax.persistence.Table;
//import java.util.Date;
//
//@Entity
//@Data
//@NoArgsConstructor
//@ToString
//@AllArgsConstructor
//@Table(name = "StatusOrder")
//public class StatusDetail {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Integer id;
//    @ManyToOne
//    @JoinColumn
//    private StatusOrder statusOrder;
//    @ManyToOne
//    @JoinColumn
//    private Orders orders;
//    @Column(name = "Description", columnDefinition = "NVARCHAR(500)")
//    private String description;
//    @Column(name = "timeDate")
//    private Date timeDate;
//    @Column(name ="isFinish")
//    private boolean isFinish;
//
//
//
//
//}
