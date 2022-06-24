package com.adwProject.Backend.entity;

import lombok.*;

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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, name = "AGENT_CODE")
    private long agentCode;
    @Column(name = "AGENT_NAME")
    private String agentName;
    @Column(name = "WORKING_AREA")
    private String workingArea;
    @Column(name = "COMMISSION")
    private float commission;
    @Column(name = "PHONE_NO")
    private String phoneNO;
    @Column(name = "COUNTRY")
    private String country;
    /*@OneToMany(mappedBy = "agentCode")
    private List<CustomerDB> customer;*/
}
