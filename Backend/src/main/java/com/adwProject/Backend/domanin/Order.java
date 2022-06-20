package com.adwProject.Backend.domanin;

import lombok.Builder;
import lombok.Value;

import java.util.UUID;

@Builder
@Value
public class Order {
    UUID ordNum;
    Float ordAMT;
    Float advanceAMT;
    String ordDate;
    UUID agentCode;
    UUID custCode;
    String ordDescription;
}
