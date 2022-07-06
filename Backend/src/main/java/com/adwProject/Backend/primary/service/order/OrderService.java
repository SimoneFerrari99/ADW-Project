package com.adwProject.Backend.primary.service.order;

import com.adwProject.Backend.primary.dto.OrderInput;
import com.adwProject.Backend.primary.entity.Order;

import java.util.List;

public interface OrderService {         //The "OrderService" interface contains a collection of methods that will be implemented in the "OrderServiceImpl" class
    Order getById(int ordNum);
    List<Order> getByCustomerCustCode(String custCode);
    List<Order> getByAgentAgentCode(String agentCode);
    Boolean deleteOrder(int ordNum);
    List<Order> getOrders (String custCode, String agentCode);
    Order createOrUpdateOrder(Integer ordNum, OrderInput orderInput);
}
