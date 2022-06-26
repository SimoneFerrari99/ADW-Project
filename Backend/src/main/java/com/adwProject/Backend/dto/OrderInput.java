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
    private String ordNum;
    private float ordAMT;
    private float advanceAMT;
    private String ordDate;
    private String agentCode;
    private String custCode;
    private String ordDescription;
}
