package com.adwProject.Backend.domanin;

import lombok.Builder;
import lombok.Value;

import java.util.UUID;

@Value
@Builder
public class Agent {
    UUID agentCode;
    String agentName;
    String workingArea;
    float commision;
    String phoneNO;
    String country;
}
