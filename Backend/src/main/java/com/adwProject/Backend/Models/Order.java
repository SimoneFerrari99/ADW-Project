package com.adwProject.Backend.Models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;


@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "orders", schema= "public")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, name = "ORD_NUM")
    private long ordNum;

    @Column(name = "ORD_AMOUNT")
    private float ordAMT;
    @Column(name = "ADVANCE_AMOUNT")
    private float advanceAMT;
    @Column(name = "ORD_DATE")
    private String ordDate;

    @MapsId
    @ManyToOne
    @JoinColumn(name = "agentCode")
    private Agent agentCode;

    @MapsId
    @ManyToOne
    @JoinColumn(name = "custCode")
    private Customer custCode;

    @Column(name = "ORD_DESCRIPTION")
    private String ordDescription;


    public long getOrdNum() {
        return ordNum;
    }

    public void setOrdNum(long ordNum) {
        this.ordNum = ordNum;
    }

    public float getOrdAMT() {
        return ordAMT;
    }

    public void setOrdAMT(float ordAMT) {
        this.ordAMT = ordAMT;
    }

    public float getAdvanceAMT() {
        return advanceAMT;
    }

    public void setAdvanceAMT(float advanceAMT) {
        this.advanceAMT = advanceAMT;
    }

    public String getOrdDate() {
        return ordDate;
    }

    public void setOrdDate(String ordDate) {
        this.ordDate = ordDate;
    }

    public Agent getAgentCode() {
        return agentCode;
    }

    public void setAgentCode(Agent agentCode) {
        this.agentCode = agentCode;
    }

    public Customer getCustCode() {
        return custCode;
    }

    public void setCustCode(Customer custCode) {
        this.custCode = custCode;
    }

    public String getOrdDescription() {
        return ordDescription;
    }

    public void setOrdDescription(String ordDescription) {
        this.ordDescription = ordDescription;
    }

    @Override
    public String toString() {
        return "OrderDB{" +
                "ordNum=" + ordNum +
                ", ordAMT=" + ordAMT +
                ", advanceAMT=" + advanceAMT +
                ", ordDate='" + ordDate + '\'' +
                ", agentCode=" + agentCode +
                ", custCode=" + custCode +
                ", ordDescription='" + ordDescription + '\'' +
                '}';
    }
}
