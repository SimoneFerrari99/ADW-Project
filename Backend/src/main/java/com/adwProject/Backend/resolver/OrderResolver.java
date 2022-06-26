package com.adwProject.Backend.resolver;

import com.adwProject.Backend.entity.Order;
import com.adwProject.Backend.service.order.OrderService;
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

}
