package com.adwProject.Backend.primary.dto;

import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
public class AgentInput {       //Used for pass data with multiple attributes in one shot from client to server. The name of this DTO is AgentInput
    private String agentCode;
    private String agentName;
    private String workingArea;
    private Float commission;
    private String phoneNO;
    private String country;
    private Boolean active;
}
