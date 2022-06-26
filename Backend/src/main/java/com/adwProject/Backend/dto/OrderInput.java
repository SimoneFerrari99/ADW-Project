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
    private String ordNum;
    private float ordAMT;
    private float advanceAMT;
    private String ordDate;
    private Agent agent;
    private Customer customer;
    private String ordDescription;
}
