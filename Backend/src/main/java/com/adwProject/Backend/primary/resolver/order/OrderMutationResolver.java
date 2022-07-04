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
    public Order createOrUpdateOrder(Integer ordNum, OrderInput orderInput) {
        return orderService.createOrUpdateOrder(ordNum, orderInput);
    }
}
