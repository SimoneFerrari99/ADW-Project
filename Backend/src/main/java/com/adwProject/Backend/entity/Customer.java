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
@Table(name = "CUSTOMER", schema= "public")
public class Customer {
    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, name = "CUST_CODE")
    //@Type(type="org.hibernate.type.UUIDCharType")
    private String custCode;

    @Column(name = "CUST_NAME")
    private String custName;
    @Column(name = "CUST_CITYE")
    private String custCity;
    @Column(name = "WORKING_AREA")
    private String workingArea;
    @Column(name = "CUST_COUNTRY")
    private String custCountry;
    @Column(name = "GRADE")
    private int grade;
    @Column(name = "OPENING_AMT")
    private float openingAMT;
    @Column(name = "RECEIVE_AMT")
    private float receiveAMT;
    @Column(name = "PAYMENT_AMT")
    private float paymentAMT;
    @Column(name = "OUTSTANDING_AMT")
    private float outstandingAMT;
    @Column(name = "PHONE_NO")
    private String phoneNO;
    @ManyToOne
    @JoinColumn(name = "agentCode")
    private Agent agentCode;

    /*@OneToMany(mappedBy = "custCode")
    private List<OrderDB> order;*/
}
