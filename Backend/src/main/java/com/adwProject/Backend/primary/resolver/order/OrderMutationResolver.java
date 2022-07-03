package com.adwProject.Backend.primary.resolver.order;

import com.adwProject.Backend.primary.dto.OrderInput;
import com.adwProject.Backend.primary.entity.Order;
import com.adwProject.Backend.primary.service.order.OrderService;
import graphql.kickstart.tools.GraphQLMutationResolver;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class OrderMutationResolver implements GraphQLMutationResolver {
    private final OrderService orderService;

    public Boolean deleteOrder(int ordNum) {
        return orderService.deleteOrder(ordNum);
    }
    public Order createOrder(OrderInput orderInput) {
        return orderService.createOrder(orderInput);
    }
    public Boolean modifyOrder(int ordNum, OrderInput orderInput) {
        return orderService.modifyOrder(orderInput, ordNum);
    }
}
