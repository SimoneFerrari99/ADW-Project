package com.adwProject.Backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.Value;


@Setter
@Getter
@Builder
@Value
public class OrderInput {
    String ordNum;
    float ordAMT;
    float advanceAMT;
    String ordDate;
    String agentCode;
    String custCode;
    String ordDescription;
}
