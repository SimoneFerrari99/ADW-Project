package com.adwProject.Backend.primary.dto;

import com.adwProject.Backend.primary.entity.Agent;
import com.adwProject.Backend.primary.entity.Customer;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.Value;


@Setter
@Getter
public class OrderInput {
    private float ordAMT;
    private float advanceAMT;
    private String agentId;
    private String customerId;
    private String ordDescription;
}
