package com.adwProject.Backend.resolver;

import com.adwProject.Backend.domanin.Agent;
import com.adwProject.Backend.domanin.Customer;
import com.adwProject.Backend.domanin.Order;
import com.adwProject.Backend.entity.CustomerDB;
import graphql.kickstart.tools.GraphQLQueryResolver;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;


@Component
@Slf4j
public class CustomerResolver implements GraphQLQueryResolver {
<<<<<<< Updated upstream

    public Customer customerById(UUID id) {
=======
    public Customer customerById(long id) {
>>>>>>> Stashed changes
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
    }
}
