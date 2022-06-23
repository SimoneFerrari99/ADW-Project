package com.adwProject.Backend.Models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;


@NoArgsConstructor
@Getter
@Setter
@Entity
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



    public long getAgentCode() {
        return agentCode;
    }

    public void setAgentCode(long agentCode) {
        this.agentCode = agentCode;
    }

    public String getAgentName() {
        return agentName;
    }

    public void setAgentName(String agentName) {
        this.agentName = agentName;
    }

    public String getWorkingArea() {
        return workingArea;
    }

    public void setWorkingArea(String workingArea) {
        this.workingArea = workingArea;
    }

    public float getCommision() {
        return commission;
    }

    public void setCommision(float commision) {
        this.commission = commision;
    }

    public String getPhoneNO() {
        return phoneNO;
    }

    public void setPhoneNO(String phoneNO) {
        this.phoneNO = phoneNO;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    @Override
    public String toString() {
        return "AgentDB{" +
                "agentCode=" + agentCode +
                ", agentName='" + agentName + '\'' +
                ", workingArea='" + workingArea + '\'' +
                ", commision=" + commission +
                ", phoneNO='" + phoneNO + '\'' +
                ", country='" + country + '\'' +
                '}';
    }
}
