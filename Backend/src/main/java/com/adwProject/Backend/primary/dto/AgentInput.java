package com.adwProject.Backend.primary.dto;

import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
public class AgentInput {
    private String agentCode;
    private String agentName;
    private String workingArea;
    private Float commission;
    private String phoneNO;
    private String country;
    private Boolean active;
}
