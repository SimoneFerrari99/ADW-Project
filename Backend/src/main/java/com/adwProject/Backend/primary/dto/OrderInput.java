package com.adwProject.Backend.primary.dto;

import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
public class OrderInput {       //Used for pass data with multiple attributes in one shot from client to server. The name of this DTO is OrderInput
    private Float ordAMT;
    private Float advanceAMT;
    private String agentCode;
    private String customerCode;
    private String ordDescription;
}
