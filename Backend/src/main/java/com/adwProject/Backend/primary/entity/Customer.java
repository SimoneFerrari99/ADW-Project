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
public class Customer {                                         //The JPA Entity (Java Persistence API) are used for managing relational data in Java applications.

    @Id                                                         //Annotation to indicate that the string "custCode" is a primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)         //Annotation used for generating new primary keys when needed
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

    @Column(name = "active")
    private Boolean active;

}
