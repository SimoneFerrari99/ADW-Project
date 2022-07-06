package com.adwProject.Backend.primary.resolver.customer;

import com.adwProject.Backend.primary.entity.Customer;
import com.adwProject.Backend.primary.service.customer.CustomerService;
import graphql.kickstart.tools.GraphQLQueryResolver;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
@AllArgsConstructor
public class CustomerQueryResolver implements GraphQLQueryResolver {                                    //The resolver, in this case GraphQLQueryResolver, is the penultimate step in executing the Query
    private final CustomerService customerService;

    public List<Customer> getCustomers(){ return customerService.getCustomers();}                       //Method used for retrieve all existing Customer

    public Customer customerById(String custCode) {                                                     //Method used for search a Customer by Id ("custCode")
        return customerService.getById(custCode);
    }

    public List<Customer> customersByAgentCode(String agentCode) {                                      //Method used for retrieve a list of Customer by "agentCode"
        return customerService.getCustomersByAgentCode(agentCode);
    }

}
