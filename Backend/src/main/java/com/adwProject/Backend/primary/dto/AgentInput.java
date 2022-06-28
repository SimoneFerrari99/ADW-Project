package com.adwProject.Backend.primary.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.Value;


@Setter
@Getter
@Value
@Builder
public class AgentInput {
    private String agentCode;
    private String agentName;
    private String workingArea;
    private float commission;
    private String phoneNO;
    private String country;
}
