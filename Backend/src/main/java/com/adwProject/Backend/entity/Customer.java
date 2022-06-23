package com.adwProject.Backend.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;


@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "customer", schema= "public")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, name = "CUST_CODE")
    private long custCode;

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


    public long getCustCode() {
        return custCode;
    }

    public void setCustCode(long custCode) {
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

    public float getOpeningAMT() {
        return openingAMT;
    }

    public void setOpeningAMT(float openingAMT) {
        this.openingAMT = openingAMT;
    }

    public float getReceiveAMT() {
        return receiveAMT;
    }

    public void setReceiveAMT(float receiveAMT) {
        this.receiveAMT = receiveAMT;
    }

    public float getPaymentAMT() {
        return paymentAMT;
    }

    public void setPaymentAMT(float paymentAMT) {
        this.paymentAMT = paymentAMT;
    }

    public float getOutstandingAMT() {
        return outstandingAMT;
    }

    public void setOutstandingAMT(float outstandingAMT) {
        this.outstandingAMT = outstandingAMT;
    }

    public String getPhoneNO() {
        return phoneNO;
    }

    public void setPhoneNO(String phoneNO) {
        this.phoneNO = phoneNO;
    }

    public Agent getAgentCode() {
        return agentCode;
    }

    public void setAgentCode(Agent agentCode) {
        this.agentCode = agentCode;
    }

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

}
