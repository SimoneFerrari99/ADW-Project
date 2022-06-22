package com.adwProject.Backend.entity;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "orders", schema= "public")
public class OrderDB {
    @Id
    private UUID ordNum;

    @Column(name = "ORD_AMOUNT")
    private float ordAMT;
    @Column(name = "ADVANCE_AMOUNT")
    private float advanceAMT;
    @Column(name = "ORD_DATE")
    private String ordDate;

    @MapsId
    @ManyToOne
    @JoinColumn(name = "agentCode")
    private AgentDB agentCode;

    @MapsId
    @ManyToOne
    @JoinColumn(name = "custCode")
    private CustomerDB custCode;

    @Column(name = "ORD_DESCRIPTION")
    private String ordDescription;

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

    public UUID getOrdNum() {
        return ordNum;
    }

    public void setOrdNum(UUID ordNum) {
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

    public AgentDB getAgentCode() {
        return agentCode;
    }

    public void setAgentCode(AgentDB agentCode) {
        this.agentCode = agentCode;
    }

    public CustomerDB getCustCode() {
        return custCode;
    }

    public void setCustCode(CustomerDB custCode) {
        this.custCode = custCode;
    }

    public String getOrdDescription() {
        return ordDescription;
    }

    public void setOrdDescription(String ordDescription) {
        this.ordDescription = ordDescription;
    }
}
