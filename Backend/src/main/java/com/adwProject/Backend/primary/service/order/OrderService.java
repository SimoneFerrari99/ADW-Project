package com.adwProject.Backend.primary.service.order;

import com.adwProject.Backend.primary.entity.Order;

import java.util.List;

public interface OrderService {
    Order getById(String id);
    List<Order> getByCustomerCustCode(String custCode);
    List<Order> getByAgentAgentCode(String agentCode);
    Boolean deleteOrder(String code);
}
