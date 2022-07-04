package com.adwProject.Backend.primary.entity;

import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@ToString
@Table(name = "customers", schema= "public")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, name = "cust_code")
    private String custCode;

    @Column(name = "cust_name")
    private String custName;

    @Column(name = "cust_city")
    private String custCity;

    @Column(name = "working_area")
    private String workingArea;

    @Column(name = "cust_country")
    private String custCountry;

    @Column(name = "grade")
    private int grade;

    @Column(name = "opening_amt")
    private Float openingAMT;

    @Column(name = "receive_amt")
    private Float receiveAMT;

    @Column(name = "payment_amt")
    private Float paymentAMT;

    @Column(name = "outstanding_amt")
    private Float outstandingAMT;

    @Column(name = "phone_no")
    private String phoneNO;

    @ManyToOne
    @JoinColumn(name = "agent_code")
    private Agent agent;

    /*@OneToMany(mappedBy = "custCode")
    private List<OrderDB> order;*/
}
