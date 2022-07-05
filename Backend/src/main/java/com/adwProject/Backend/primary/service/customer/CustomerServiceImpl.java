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

    @Override
    public Customer createOrUpdateCustomer(String custCode, CustomerInput customerInput) {
        if(custCode == null) {
            Customer customer = mapCustomer.mapInputToCreateCustomer(customerInput, findAgentById(customerInput.getAgentCode()));
            customerRepository.save(customer);
            return customer;
        }
        if(customerInput.getOpeningAMT() == null &&
                customerInput.getReceiveAMT() == null &&
                customerInput.getPaymentAMT() == null &&
                customerInput.getOutstandingAMT() == null) {
            Customer customer = customerRepository.findById(custCode).orElse(null);
            if(customer != null) {
                mapCustomer.updateDataCustomerFields(customer, customerInput);
                customerRepository.save(customer);
                return customer;
            }
            throw new GraphQLException("There is no Customer according with id: " + custCode);
        }
        Customer customer = customerRepository.findById(custCode).orElse(null);
        if(customer != null) {
            mapCustomer.updateAllCustomerFields(customer, customerInput, findAgentById(customerInput.getAgentCode()));
            customerRepository.save(customer);
            return customer;
        }
        throw new GraphQLException("There is no Customer according with id: " + custCode);
    }

    @RequestMapping(value="/primary")
    @Override
    public List<Customer> getCustomers() {
        return customerRepository.findAll();
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
            Customer customer = customerRepository.findById(custCode).orElse(null);
            User user = userRepository.findById(custCode).orElse(null);

            if(customer != null) {
                customer.setActive(false);
                customerRepository.save(customer);
                if(user != null) {
                    user.setActive(false);
                    userRepository.save(user);
                }
                return true;
            }
        }
        return false;
    }

    @Override
    public Boolean restoreCustomer(String custCode) {
        Customer customer = customerRepository.findById(custCode).orElse(null);
        User user = userRepository.findById(custCode).orElse(null);

        if(customer != null) {
            customer.setActive(true);
            customerRepository.save(customer);
            if(user != null) {
                user.setActive(true);
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
