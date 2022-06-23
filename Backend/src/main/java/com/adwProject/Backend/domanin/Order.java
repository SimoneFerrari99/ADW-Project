package com.adwProject.Backend.domanin;

import lombok.Builder;
import lombok.Value;



@Builder
@Value
public class Order {
    long ordNum;
    float ordAMT;
    float advanceAMT;
    String ordDate;
    long agentCode;
    long custCode;
    String ordDescription;
}
