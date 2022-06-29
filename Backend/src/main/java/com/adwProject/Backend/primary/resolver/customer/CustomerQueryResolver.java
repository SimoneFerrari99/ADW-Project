package com.adwProject.Backend.primary.resolver.customer;

import com.adwProject.Backend.primary.entity.Customer;
import com.adwProject.Backend.primary.service.customer.CustomerService;
import graphql.kickstart.tools.GraphQLQueryResolver;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;


@Component
@Slf4j
@AllArgsConstructor
public class CustomerQueryResolver implements GraphQLQueryResolver {
    private final CustomerService customerService;

    public Customer customerById(String custCode) {
        return customerService.getById(custCode);
    }
}
