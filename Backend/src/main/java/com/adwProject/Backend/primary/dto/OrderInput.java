package com.adwProject.Backend.primary.dto;

import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
public class OrderInput {
    private Float ordAMT;
    private Float advanceAMT;
    private String agentCode;
    private String customerCode;
    private String ordDescription;
}
