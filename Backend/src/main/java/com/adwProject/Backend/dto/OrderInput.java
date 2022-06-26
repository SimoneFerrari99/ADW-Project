package com.adwProject.Backend.dto;

import com.adwProject.Backend.entity.Agent;
import com.adwProject.Backend.entity.Customer;
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
    Agent agent;
    Customer customer;
    String ordDescription;
}
