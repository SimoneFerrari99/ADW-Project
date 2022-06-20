package com.adwProject.Backend.resolver;

import com.adwProject.Backend.domanin.Customer;
import graphql.kickstart.tools.GraphQLQueryResolver;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Slf4j
@Component
public class CustomerResolver implements GraphQLQueryResolver {
    public Customer customerById(UUID custCode) {
        log.info("Retrieving customer id: {}", custCode);

        return Customer.builder().custCode(custCode).build();
    }
}
