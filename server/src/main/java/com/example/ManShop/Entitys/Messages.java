package com.example.ManShop.Entitys;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "messages")
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Messages {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "content", columnDefinition = "NVARCHAR(2500)")
    private String content;

    private Date createdat;

    private Boolean status;

    @ManyToOne
    @JoinColumn(name="createduser")
    private Users createdby;

    @ManyToOne
    @JoinColumn(name="sendeduser")
    private Users sendedby;

    @ManyToOne
    @JoinColumn(name="receiveduser")
    private Users receivedby;
}
