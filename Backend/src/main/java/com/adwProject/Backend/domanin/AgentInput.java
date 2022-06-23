package com.adwProject.Backend.domanin;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.Value;


@Setter
@Getter
@Value
@Builder
public class AgentInput {
    long agentCode;
    String agentName;
    String workingArea;
    float commission;
    String phoneNO;
    String country;
}
