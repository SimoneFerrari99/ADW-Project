package com.adwProject.Backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.Value;


@Setter
@Getter
@Value
@Builder
public class CustomerInput {
    private String custCode;
    private String custName;
    private String custCity;
    private String workingArea;
    private String custCountry;
    private int grade;
    private float openingAMT;
    private float receiveAMT;
    private float paymentAMT;
    private float outstandingAMT;
    private String phoneNO;
    private String agentCode;
}
