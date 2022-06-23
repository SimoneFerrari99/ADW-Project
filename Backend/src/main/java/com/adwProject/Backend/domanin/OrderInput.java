package com.adwProject.Backend.domanin;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.Value;


@Setter
@Getter
@Builder
@Value
public class OrderInput {
    long ordNum;
    float ordAMT;
    float advanceAMT;
    String ordDate;
    long agentCode;
    long custCode;
    String ordDescription;
}
