package com.adwProject.Backend.primary.resolver.customer;

import com.adwProject.Backend.primary.dto.CustomerInput;
import com.adwProject.Backend.primary.entity.Customer;
import com.adwProject.Backend.primary.service.customer.CustomerService;
import graphql.kickstart.tools.GraphQLMutationResolver;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class CustomerMutationResolver implements GraphQLMutationResolver {                                          //The resolver, in this case GraphQLMutationResolver, is the penultimate step in executing the Mutation

    private final CustomerService customerService;

    public Customer createOrUpdateCustomer(String custCode, CustomerInput customerInput) {                          //Method used for create a new Customer or update an existing Customer
        return customerService.createOrUpdateCustomer(custCode, customerInput);
    }
    public Boolean deleteCustomer(String custCode) {                                                                //Method used for delete an existing Customer by Id ("custCode"), if exist
        return customerService.deleteCustomer(custCode);
    }
    public Boolean restoreCustomer(String custCode) {                                                               //Method used for restore a disabled Customer
        return customerService.restoreCustomer(custCode);
    }



}
