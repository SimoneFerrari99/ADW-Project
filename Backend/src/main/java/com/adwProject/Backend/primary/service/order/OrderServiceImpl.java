package com.adwProject.Backend.primary.service.order;

import com.adwProject.Backend.primary.entity.Order;
import com.adwProject.Backend.primary.repository.OrderRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Service
@AllArgsConstructor
public class OrderServiceImpl implements OrderService{
    private final OrderRepository orderRepository;

    @RequestMapping(value="/primary")
    @Override
    public Order getById(String id) {
        return orderRepository.findById(id).orElse(null);
    }

    @RequestMapping(value="/primary")
    @Override
    public List<Order> getByCustomerCustCode(String custCode) {
        return orderRepository.findByCustomerCustCode(custCode).orElse(null);
    }

    @Override
    public List<Order> getByAgentAgentCode(String agentCode) {
        return orderRepository.findByAgentAgentCode(agentCode).orElse(null);
    }


}
