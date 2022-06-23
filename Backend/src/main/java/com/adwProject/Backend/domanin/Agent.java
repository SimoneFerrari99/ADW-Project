package com.adwProject.Backend.domanin;

import lombok.Builder;
import lombok.Value;



@Value
@Builder
public class Agent {
    long agentCode;
    String agentName;
    String workingArea;
    float commision;
    String phoneNO;
    String country;
}
