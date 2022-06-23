package com.adwProject.Backend.domanin;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.Value;


@Setter
@Getter
@Value
@Builder
public class CustomerInput {
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
