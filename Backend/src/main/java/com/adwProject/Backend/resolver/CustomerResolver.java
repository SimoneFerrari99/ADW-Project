package com.adwProject.Backend.resolver;

import com.adwProject.Backend.entity.Agent;
import com.adwProject.Backend.entity.Customer;
import com.adwProject.Backend.service.customer.CustomerService;
import graphql.kickstart.tools.GraphQLQueryResolver;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;


@Component
@Slf4j
@AllArgsConstructor
public class CustomerResolver implements GraphQLQueryResolver {
    private final CustomerService customerService;

    public Customer customerById(String custCode) {
        return customerService.getById(custCode);
    }
}
