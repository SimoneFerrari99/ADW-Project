package com.adwProject.Backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.Value;


@Setter
@Getter
@Value
@Builder
public class AgentInput {
    String agentCode;
    String agentName;
    String workingArea;
    float commission;
    String phoneNO;
    String country;
}
