package com.adwProject.Backend.service.order;

import com.adwProject.Backend.entity.Order;

import java.util.List;

public interface OrderService {
    Order getById(String id);
    List<Order> getByCustomerCustCode(String custCode);
}
