package com.adwProject.Backend.primary.service.order;

import com.adwProject.Backend.primary.dto.OrderInput;
import com.adwProject.Backend.primary.entity.Agent;
import com.adwProject.Backend.primary.entity.Customer;
import com.adwProject.Backend.primary.entity.Order;
import com.adwProject.Backend.primary.map.MapOrder;
import com.adwProject.Backend.primary.repository.AgentRepository;
import com.adwProject.Backend.primary.repository.CustomerRepository;
import com.adwProject.Backend.primary.repository.OrderRepository;
import graphql.GraphQLException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Service
@AllArgsConstructor
public class OrderServiceImpl implements OrderService{
    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final AgentRepository agentRepository;
    private final MapOrder mapOrder;

    @RequestMapping(value="/primary")
    @Override
    public Order getById(int ordNum) {
        return orderRepository.findById(ordNum).orElse(null);
    }

    @RequestMapping(value="/primary")
    @Override
    public List<Order> getByCustomerCustCode(String custCode) {
        return orderRepository.findByCustomerCustCode(custCode).orElse(null);
    }

    @RequestMapping(value="/primary")
    @Override
    public List<Order> getByAgentAgentCode(String agentCode) {
        return orderRepository.findByAgentAgentCode(agentCode).orElse(null);
    }

    @RequestMapping(value="/primary")
    @Override
    public Boolean deleteOrder(int ordNum) {
        if(orderRepository.existsById(ordNum)) {
            orderRepository.deleteById(ordNum);
            return true;
        }
        return false;
    }

    @RequestMapping(value="/primary")
    @Override
    public Order createOrder(OrderInput orderInput) {
        Order order = mapOrder.MapInputToOrder(orderInput, findCustomerById(orderInput.getCustomerId()), findAgentById(orderInput.getAgentId()));
        return orderRepository.save(order);
    }

    @RequestMapping(value="/primary")
    private Customer findCustomerById(String id) {
        Customer customer = customerRepository.findById(id).get();
        if (customer == null)
            throw new GraphQLException("There is no Customer according with id: " + id);

        return customer;
    }

    @RequestMapping(value="/primary")
    private Agent findAgentById(String id) {
        Agent agent = agentRepository.findById(id).get();
        if (agent == null)
            throw new GraphQLException("There is no Agent according with id: " + id);

        return agent;
    }


}
