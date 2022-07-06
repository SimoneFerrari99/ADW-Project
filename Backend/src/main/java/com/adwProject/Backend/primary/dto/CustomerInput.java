package com.adwProject.Backend.primary.dto;

import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
public class CustomerInput {        //Used for pass data with multiple attributes in one shot from client to server. The name of this DTO is CustomerInput
    private String custName;
    private String custCity;
    private String workingArea;
    private String custCountry;
    private Integer grade;
    private Float openingAMT;
    private Float receiveAMT;
    private Float paymentAMT;
    private Float outstandingAMT;
    private String phoneNO;
    private String agentCode;
    private Boolean active;
}
