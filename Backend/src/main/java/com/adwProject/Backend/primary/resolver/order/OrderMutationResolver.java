package com.adwProject.Backend.primary.resolver.order;

import com.adwProject.Backend.primary.dto.OrderInput;
import com.adwProject.Backend.primary.entity.Order;
import com.adwProject.Backend.primary.service.order.OrderService;
import graphql.kickstart.tools.GraphQLMutationResolver;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class OrderMutationResolver implements GraphQLMutationResolver {                                     //The resolver, in this case GraphQLMutationResolver, is the penultimate step in executing the Mutation
    private final OrderService orderService;

    public Boolean deleteOrder(Integer ordNum) {                                                            //Method used for delete an existing Order by Id ("ordNum"), if exist
        return orderService.deleteOrder(ordNum);
    }
    public Order createOrUpdateOrder(Integer ordNum, OrderInput orderInput) {                               //Method used for create a new Order or update an existing Order
        return orderService.createOrUpdateOrder(ordNum, orderInput);
    }
}
