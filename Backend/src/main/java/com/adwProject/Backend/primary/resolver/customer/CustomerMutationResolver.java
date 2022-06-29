package com.adwProject.Backend.primary.resolver.customer;

import com.adwProject.Backend.primary.dto.CustomerInput;
import com.adwProject.Backend.primary.entity.Customer;
import com.adwProject.Backend.primary.service.customer.CustomerService;
import graphql.kickstart.tools.GraphQLMutationResolver;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class CustomerMutationResolver implements GraphQLMutationResolver {

    private final CustomerService customerService;

    public Customer updateAllFields(String id, CustomerInput customerInput) {
        return customerService.update(id, customerInput, true);
    }

    public Customer updateDataFields(String id, CustomerInput customerInput) {
        return customerService.update(id, customerInput, false);
    }

}
