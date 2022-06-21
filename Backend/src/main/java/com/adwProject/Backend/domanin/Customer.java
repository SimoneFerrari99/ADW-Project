package com.adwProject.Backend.domanin;

import lombok.Builder;
import lombok.Value;

import java.util.UUID;

@Value
@Builder
public class Customer {
    UUID custCode;
    String custName;
    String custCity;
    String workingArea;
    String custCountry;
    int grade;
    Float openingAMT;
    Float receiveAMT;
    Float paymentAMT;
    Float outstandingAMT;
    String phoneNO;
    UUID agentCode;
}
