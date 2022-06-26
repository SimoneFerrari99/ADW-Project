package com.adwProject.Backend.dto;

import com.adwProject.Backend.entity.Agent;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.Value;


@Setter
@Getter
@Value
@Builder
public class CustomerInput {
    String custCode;
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
    Agent agent;
}
