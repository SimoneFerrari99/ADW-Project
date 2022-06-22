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
    float openingAMT;
    float receiveAMT;
    float paymentAMT;
    float outstandingAMT;
    String phoneNO;
    UUID agentCode;
}
