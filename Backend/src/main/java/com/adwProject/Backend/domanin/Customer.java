package com.adwProject.Backend.domanin;

import lombok.Builder;
import lombok.Value;



@Value
@Builder
public class Customer {
    long custCode;
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
    long agentCode;
}
