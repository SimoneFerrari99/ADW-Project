package com.adwProject.Backend.primary.service.order;

import com.adwProject.Backend.primary.dto.OrderInput;
import com.adwProject.Backend.primary.entity.Order;

import java.util.List;

public interface OrderService {
    Order getById(int ordNum);
    List<Order> getByCustomerCustCode(String custCode);
    List<Order> getByAgentAgentCode(String agentCode);
    Boolean deleteOrder(int ordNum);
    Order createOrder(OrderInput orderInput);
    Boolean modifyOrder(OrderInput orderInput, int ordNum);
    List<Order> getOrders (String custCode, String agentCode);
}
