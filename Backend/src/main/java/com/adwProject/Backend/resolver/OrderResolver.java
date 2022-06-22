package com.adwProject.Backend.resolver;

import com.adwProject.Backend.domanin.Agent;
import com.adwProject.Backend.domanin.Customer;
import com.adwProject.Backend.domanin.Order;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@Slf4j
public class OrderResolver {
    public Order orderById(UUID id) {
        log.info("Retrieving order id: {}", id);

        return Order.builder()
                .ordNum(id)
                .ordAMT(5.5f)
                .advanceAMT(5.5f)
                .ordDate("ieri")
                .agentCode(UUID.randomUUID())
                .custCode(UUID.randomUUID())
                .ordDescription("prova")
                .build();
    }
    public Customer customerById(UUID custCode) {
        return Customer.builder().custCode(custCode).build();
    }
    public Agent agentById(UUID agentCode) {
        return Agent.builder().agentCode(agentCode).build();
    }
}
