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
    public Customer getById(String custCode) {
        return customerRepository.findById(custCode).orElse(null);
    }

    @RequestMapping(value="/primary")
    @Override
    public List<Customer> getCustomers() {
        return customerRepository.findAll();
    }

    @RequestMapping(value="/primary")
    @Override
    public Boolean update(String custCode, CustomerInput customerInput, Boolean allFields) {
        Optional<Customer> optCustomer = customerRepository.findById(custCode);
        Customer customer;

        if(optCustomer.isPresent() && allFields) {
            customer = optCustomer.get();
            Agent agent = findAgentById(customerInput.getAgentCode());
            mapCustomer.updateAllCustomerFields(customer, customerInput, agent);
            customerRepository.save(customer);
            return true;
        }
        else {
            if(optCustomer.isPresent() && !allFields) {
                customer = optCustomer.get();
                mapCustomer.updateCustomerFields(customer, customerInput);
                customerRepository.save(customer);
                return true;
            }
        }
        return false;
    }

    @RequestMapping(value="/primary")
    @Override
    public List<Customer> getCustomersByAgentCode(String agentCode) {
        return customerRepository.findAgentByAgentAgentCode(agentCode).orElse(null);
    }

    @RequestMapping(value="/primary")
    @Override
    public Boolean deleteCustomer(String custCode) {
        if(customerRepository.existsById(custCode)) {
            customerRepository.deleteById(custCode);
            return true;
        }
        return false;
    }

    @RequestMapping(value="/primary")
    private Agent findAgentById(String agentCode) {
        Agent agent = agentRepository.findById(agentCode).orElse(null);
        if (agent == null)
            throw new GraphQLException("There is no Agent according with id: " + agentCode);

        return agent;
    }
}
