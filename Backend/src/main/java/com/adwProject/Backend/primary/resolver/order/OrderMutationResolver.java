package com.adwProject.Backend.primary.resolver.order;

import com.adwProject.Backend.primary.service.order.OrderService;
import graphql.kickstart.tools.GraphQLMutationResolver;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class OrderMutationResolver implements GraphQLMutationResolver {
    private final OrderService orderService;

    public Boolean deleteOrder(String code) {
        return orderService.deleteOrder(code);
    }
}
