package com.adwProject.Backend.primary.resolver;

import com.adwProject.Backend.primary.entity.Order;
import com.adwProject.Backend.primary.service.order.OrderService;
import graphql.kickstart.tools.GraphQLQueryResolver;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
@Slf4j
@AllArgsConstructor
public class OrderResolver implements GraphQLQueryResolver {
    private final OrderService orderService;

    public Order orderById(String ordNum) {
        return orderService.getById(ordNum);
    }
    public List<Order> ordersByCustomerCustCode(String custCode) {
        return orderService.getByCustomerCustCode(custCode);
    }

    public List<Order> ordersByAgentAgentCode(String agentCode) {
        return orderService.getByAgentAgentCode(agentCode);
    }

}
