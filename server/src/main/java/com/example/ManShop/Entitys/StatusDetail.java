package com.example.ManShop.Entitys;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
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
    private StatusOrder statusOrder;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "OrderID")
    private Orders orders;
    @Column(name = "Description", columnDefinition = "NVARCHAR(500)")
    private String description;
    @Column(name = "TimeDate")
    private Date timeDate;
    @Column(name ="IsFinish")
    private boolean isFinish;
    @ManyToOne
//    @JsonIgnore
    @JoinColumn(name = "Userupdate")
    private Users usersUpdate;

//    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "Userupdate", referencedColumnName = "id")
//    private Users usersUpdate;




}
