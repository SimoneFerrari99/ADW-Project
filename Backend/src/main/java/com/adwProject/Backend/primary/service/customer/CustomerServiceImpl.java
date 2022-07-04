package com.adwProject.Backend.primary.service.customer;

import com.adwProject.Backend.primary.dto.CustomerInput;
import com.adwProject.Backend.primary.entity.Agent;
import com.adwProject.Backend.primary.entity.Customer;
import com.adwProject.Backend.primary.entity.Order;
import com.adwProject.Backend.primary.map.MapCustomer;
import com.adwProject.Backend.primary.repository.AgentRepository;
import com.adwProject.Backend.primary.repository.CustomerRepository;
import com.adwProject.Backend.primary.repository.OrderRepository;
import com.adwProject.Backend.secondary.entity.User;
import com.adwProject.Backend.secondary.repository.UserRepository;
import graphql.GraphQLException;
import lombok.AllArgsConstructor;
import org.aspectj.weaver.ast.Or;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CustomerServiceImpl implements CustomerService {
    private final CustomerRepository customerRepository;
    private final AgentRepository agentRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
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
        return customerRepository.findCustomerByAgentAgentCode(agentCode).orElse(null);
    }

    @RequestMapping(value="/primary")
    @Override
    public Boolean deleteCustomer(String custCode) {
        List<Order> orders = orderRepository.findByCustomerCustCode(custCode).orElse(null);
        if(orders == null) {
            throw new GraphQLException("There is no Customer according with id: " + custCode);
        }
        if(orders.isEmpty() && customerRepository.existsById(custCode)) {
            User user = userRepository.findById(custCode).orElse(null);

            customerRepository.deleteById(custCode);
            if(user != null) {
                user.setActive(false);
                userRepository.save(user);
            }

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
