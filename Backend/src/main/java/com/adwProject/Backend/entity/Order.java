package com.adwProject.Backend.entity;

import lombok.*;
import org.hibernate.annotations.Type;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@ToString
@Table(name = "orders", schema= "public")
public class Order {
    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, name = "ord_num")
    //@Type(type="org.hibernate.type.UUIDCharType")
    private String ordNum;

    @Column(name = "ord_amt")
    private float ordAMT;
    @Column(name = "advance_amt")
    private float advanceAMT;
    @Column(name = "ord_date")
    private String ordDate;

    @MapsId
    @ManyToOne
    @JoinColumn(name = "agent_code")
    private Agent agent;

    @MapsId
    @ManyToOne
    @JoinColumn(name = "cust_code")
    private Customer customer;

    @Column(name = "ord_description")
    private String ordDescription;
}
