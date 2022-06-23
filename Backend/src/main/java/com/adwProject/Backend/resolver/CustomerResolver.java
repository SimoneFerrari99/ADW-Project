package com.adwProject.Backend.resolver;

import com.adwProject.Backend.entity.Agent;
import graphql.kickstart.tools.GraphQLQueryResolver;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;


@Component
@Slf4j
@AllArgsConstructor
public class CustomerResolver implements GraphQLQueryResolver {
    /*public Customer customerById(long id) {
        log.info("Retrieving customer id: {}", id);

        return Customer.builder()
                .custCode(id)
                .custName("Giulio")
                .custCity("Padova")
                .workingArea("Informatica")
                .custCountry("Italia")
                .grade(12)
                .openingAMT(5.5f)
                .receiveAMT(5.5f)
                .paymentAMT(5.5f)
                .outstandingAMT(5.5f)
                .phoneNO("test")
                .agentCode(1)
                .build();
    }
    public Agent agentById(long agentCode) {
        return Agent.builder().agentCode(agentCode).build();
    }
    public Order orderById(long ordNum) {
        return Order.builder().ordNum(ordNum).build();
    }
    public Customer getcustCounty() {
        return Customer.builder().build();
    }*/
    private final CustomerService customerService;
    public Agent customerById(long id) {
        return CustomerService.getById(id);
    }
}
