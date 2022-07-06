package com.adwProject.Backend.primary.resolver.order;

import com.adwProject.Backend.primary.entity.Order;
import com.adwProject.Backend.primary.service.order.OrderService;
import graphql.kickstart.tools.GraphQLQueryResolver;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
@AllArgsConstructor
public class OrderQueryResolver implements GraphQLQueryResolver {                                                           //The resolver, in this case GraphQLQueryResolver, is the penultimate step in executing the Query
    private final OrderService orderService;

    public Order orderById(int ordNum) {                                                                                    //Method used for search an Order by Id ("ordNum")
        return orderService.getById(ordNum);
    }

    public List<Order> ordersByCustomerCustCode(String custCode) {                                                          //Method used for retrieve a list of Order by "custCode"
        return orderService.getByCustomerCustCode(custCode);
    }

    public List<Order> ordersByAgentAgentCode(String agentCode) {                                                           //Method used for retrieve a list of Order by "agentCode"
        return orderService.getByAgentAgentCode(agentCode);
    }
    public List<Order> getOrders (String custCode, String agentCode) {                                                      //Method used for retrieve a list of Order by "custCode" and "agentCode"
        return orderService.getOrders(custCode, agentCode);
    }

}
