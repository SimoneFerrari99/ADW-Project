package com.adwProject.Backend.resolver;

import com.adwProject.Backend.domanin.Agent;
import com.adwProject.Backend.domanin.Customer;
import com.adwProject.Backend.domanin.Order;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;



@Component
@Slf4j
public class AgentResolver {
    public Agent agentById(long id) {
        log.info("Retrieving agent id: {}", id);

        return Agent.builder()
                .agentCode(id)
                .agentName("Tony")
                .workingArea("IT")
                .commision(5.5f)
                .phoneNO("test1")
                .country("Svizzera")
                .build();
    }
    public Customer customerById(long custCode) {
        return Customer.builder().custCode(custCode).build();
    }
    public Order orderById(long ordNum) {
        return Order.builder().ordNum(ordNum).build();
    }
}
