package com.adwProject.Backend.primary.service.customer;

import com.adwProject.Backend.primary.dto.CustomerInput;
import com.adwProject.Backend.primary.entity.Agent;
import com.adwProject.Backend.primary.entity.Customer;
import com.adwProject.Backend.primary.map.MapCustomer;
import com.adwProject.Backend.primary.repository.AgentRepository;
import com.adwProject.Backend.primary.repository.CustomerRepository;
import graphql.GraphQLException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CustomerServiceImpl implements CustomerService {
    private final CustomerRepository customerRepository;
    private final AgentRepository agentRepository;
    private final MapCustomer mapCustomer;

    @RequestMapping(value="/primary")
    @Override
    public List<Customer> getCustomers() {
        return customerRepository.findAll();
    }

    @RequestMapping(value="/primary")
    @Override
    public Customer getById(String id) {
        return customerRepository.findById(id).orElse(null);
    }

    @RequestMapping(value="/primary")
    @Override
    public Customer update(String id, CustomerInput customerInput, Boolean allFields) {
        Optional<Customer> optCustomer = customerRepository.findById(id);
        Customer customer;

        if(optCustomer.isPresent() && allFields) {
            customer = optCustomer.get();
            Agent agent = findAgentById(customerInput.getAgent());
            mapCustomer.updateAllCustomerFields(customer, customerInput, agent);
            customerRepository.save(customer);
            return customer;
        }
        else {
            if(optCustomer.isPresent() && !allFields) {
                customer = optCustomer.get();
                mapCustomer.updateCustomerFields(customer, customerInput);
                customerRepository.save(customer);
                return customer;
            }
        }
        return null;
    }

    @RequestMapping(value="/primary")
    @Override
    public List<Customer> getCustomersByAgentCode(String agentCode) {
        return customerRepository.findAgentByAgentAgentCode(agentCode).orElse(null);
    }

    @RequestMapping(value="/primary")
    private Agent findAgentById(String id) {
        Agent agent = agentRepository.findById(id).orElse(null);
        if (agent == null)
            throw new GraphQLException("There is no Agent according with id: " + id);

        return agent;
    }
}
