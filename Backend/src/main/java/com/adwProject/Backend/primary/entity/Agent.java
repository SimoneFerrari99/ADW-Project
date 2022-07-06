package com.adwProject.Backend.primary.entity;

import lombok.*;
import org.hibernate.annotations.Type;

import javax.persistence.*;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@ToString
@Table(name = "agents", schema= "public")
public class Agent {                                            //The JPA Entity (Java Persistence API) are used for managing relational data in Java applications.

    @Id                                                         //Annotation to indicate that the string "agentCode" is a primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)         //Annotation used for generating new primary keys when needed
    @Column(unique = true, name = "agent_code")
    private String agentCode;

    @Column(name = "agent_name")
    private String agentName;

    @Column(name = "working_area")
    private String workingArea;

    @Column(name = "commission")
    private Float commission;

    @Column(name = "phone_no")
    private String phoneNO;

    @Column(name = "country")
    private String country;

    @Column(name = "active")
    private Boolean active;
}
