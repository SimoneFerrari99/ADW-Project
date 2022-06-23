package com.adwProject.Backend.resolver;

import com.adwProject.Backend.domanin.Agent;
import com.adwProject.Backend.domanin.Customer;
import com.adwProject.Backend.domanin.Order;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;



@Component
@Slf4j
public class OrderResolver {
    public Order orderById(long id) {
        log.info("Retrieving order id: {}", id);

        return Order.builder()
                .ordNum(id)
                .ordAMT(5.5f)
                .advanceAMT(5.5f)
                .ordDate("ieri")
                .agentCode(1)
                .custCode(1)
                .ordDescription("prova")
                .build();
    }
    public Customer customerById(long custCode) {
        return Customer.builder().custCode(custCode).build();
    }
    public Agent agentById(long agentCode) {
        return Agent.builder().agentCode(agentCode).build();
    }
}
