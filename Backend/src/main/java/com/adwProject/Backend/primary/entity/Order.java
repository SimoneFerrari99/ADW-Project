package com.adwProject.Backend.primary.entity;

import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@ToString
@Table(name = "orders", schema= "public")
public class Order {                                            //The JPA Entity (Java Persistence API) are used for managing relational data in Java applications.

    @Id                                                         //Annotation to indicate that the string "ordNum" is a primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)         //Annotation used for generating new primary keys when needed
    @Column(unique = true, name = "ord_num")
    private Integer ordNum;

    @Column(name = "ord_amt")
    private Float ordAMT;

    @Column(name = "advance_amt")
    private Float advanceAMT;

    @Column(name = "ord_date")
    private String ordDate;

    @ManyToOne
    @JoinColumn(name = "agent_code")
    private Agent agent;

    @ManyToOne
    @JoinColumn(name = "cust_code")
    private Customer customer;

    @Column(name = "ord_description")
    private String ordDescription;
}
