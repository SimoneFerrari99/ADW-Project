package com.adwProject.Backend.entity;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "customer", schema= "public")
public class CustomerDB {
    @Id
    private UUID custCode;

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
    private Float openingAMT;
    @Column(name = "RECEIVE_AMT")
    private Float receiveAMT;
    @Column(name = "PAYMENT_AMT")
    private Float paymentAMT;
    @Column(name = "OUTSTANDING_AMT")
    private Float outstandingAMT;
    @Column(name = "PHONE_NO")
    private String phoneNO;
    @ManyToOne
    @JoinColumn(name = "agentCode")
    private AgentDB agentCode;
    @OneToMany(mappedBy = "custCode")
    private List<OrderDB> order;

    @Override
    public String toString() {
        return "CustomerDB{" +
                "custCode=" + custCode +
                ", custName='" + custName + '\'' +
                ", custCity='" + custCity + '\'' +
                ", workingArea='" + workingArea + '\'' +
                ", custCountry='" + custCountry + '\'' +
                ", grade=" + grade +
                ", openingAMT=" + openingAMT +
                ", receiveAMT=" + receiveAMT +
                ", paymentAMT=" + paymentAMT +
                ", outstandingAMT=" + outstandingAMT +
                ", phoneNO='" + phoneNO + '\'' +
                ", agentCode=" + agentCode +
                '}';
    }

    public UUID getCustCode() {
        return custCode;
    }

    public void setCustCode(UUID custCode) {
        this.custCode = custCode;
    }

    public String getCustName() {
        return custName;
    }

    public void setCustName(String custName) {
        this.custName = custName;
    }

    public String getCustCity() {
        return custCity;
    }

    public void setCustCity(String custCity) {
        this.custCity = custCity;
    }

    public String getWorkingArea() {
        return workingArea;
    }

    public void setWorkingArea(String workingArea) {
        this.workingArea = workingArea;
    }

    public String getCustCountry() {
        return custCountry;
    }

    public void setCustCountry(String custCountry) {
        this.custCountry = custCountry;
    }

    public int getGrade() {
        return grade;
    }

    public void setGrade(int grade) {
        this.grade = grade;
    }

    public Float getOpeningAMT() {
        return openingAMT;
    }

    public void setOpeningAMT(Float openingAMT) {
        this.openingAMT = openingAMT;
    }

    public Float getReceiveAMT() {
        return receiveAMT;
    }

    public void setReceiveAMT(Float receiveAMT) {
        this.receiveAMT = receiveAMT;
    }

    public Float getPaymentAMT() {
        return paymentAMT;
    }

    public void setPaymentAMT(Float paymentAMT) {
        this.paymentAMT = paymentAMT;
    }

    public Float getOutstandingAMT() {
        return outstandingAMT;
    }

    public void setOutstandingAMT(Float outstandingAMT) {
        this.outstandingAMT = outstandingAMT;
    }

    public String getPhoneNO() {
        return phoneNO;
    }

    public void setPhoneNO(String phoneNO) {
        this.phoneNO = phoneNO;
    }

    public AgentDB getAgentCode() {
        return agentCode;
    }

    public void setAgentCode(AgentDB agentCode) {
        this.agentCode = agentCode;
    }
}
