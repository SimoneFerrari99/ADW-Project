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
import java.util.Optional;

@Service
@AllArgsConstructor
public class OrderServiceImpl implements OrderService{
    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final AgentRepository agentRepository;
    private final MapOrder mapOrder;

    @Override
    public Order getById(int ordNum) {
        return orderRepository.findById(ordNum).orElse(null);
    }

    @Override
    public List<Order> getByCustomerCustCode(String custCode) {
        return orderRepository.findByCustomerCustCode(custCode).orElse(null);
    }

    @Override
    public List<Order> getByAgentAgentCode(String agentCode) {
        return orderRepository.findByAgentAgentCode(agentCode).orElse(null);
    }

    @Override
    public Boolean deleteOrder(int ordNum) {
        if(orderRepository.existsById(ordNum)) {
            orderRepository.deleteById(ordNum);
            return true;
        }
        return false;
    }

    @Override
    public List<Order> getOrders(String custCode, String agentCode) {
        if(custCode == null && agentCode == null) {
            return orderRepository.findAll();
        }
        else {
            if(custCode != null && agentCode == null) {
                return orderRepository.findByCustomerCustCode(custCode).orElse(null);
            }
            return orderRepository.findByAgentAgentCode(agentCode).orElse(null);
        }
    }

    @Override
    public Order createOrUpdateOrder(Integer ordNum, OrderInput orderInput) {
        if(ordNum == null) {
            Order order = mapOrder.MapInputToCreateOrder(orderInput, findCustomerById(orderInput.getCustomerCode()), findAgentById(orderInput.getAgentCode()));
            orderRepository.save(order);
            return order;
        }
        Order order = orderRepository.findById(ordNum).orElse(null);
        if(order != null) {
            mapOrder.MapInputToUpdateOrder(orderInput, findCustomerById(orderInput.getCustomerCode()), findAgentById(orderInput.getAgentCode()), order);
            orderRepository.save(order);
            return order;
        }
        throw new GraphQLException("There is no Order according with id: " + ordNum);
    }

    private Customer findCustomerById(String id) {
        Customer customer = customerRepository.findById(id).orElse(null);
        if (customer == null)
            throw new GraphQLException("There is no Customer according with id: " + id);

        return customer;
    }

    private Agent findAgentById(String id) {
        Agent agent = agentRepository.findById(id).orElse(null);
        if (agent == null)
            throw new GraphQLException("There is no Agent according with id: " + id);

        return agent;
    }



}
