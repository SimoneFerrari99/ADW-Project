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
@Table(name = "agents", schema= "public")
public class Agent {
    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, name = "agent_code")
    //@Type(type="org.hibernate.type.UUIDCharType")
    private String agentCode;
    @Column(name = "agent_name")
    private String agentName;
    @Column(name = "working_area")
    private String workingArea;
    @Column(name = "commission")
    private float commission;
    @Column(name = "phone_no")
    private String phoneNO;
    @Column(name = "country")
    private String country;
    /*@OneToMany(mappedBy = "agentCode")
    private List<CustomerDB> customer;*/
}
