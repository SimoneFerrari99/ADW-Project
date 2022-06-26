package com.adwProject.Backend.service.order;

import com.adwProject.Backend.entity.Order;
import com.adwProject.Backend.repository.OrderRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class OrderServiceImpl implements OrderService{
    private final OrderRepository orderRepository;

    @Override
    public Order getById(String id) {
        return orderRepository.findById(id).get();
    }
}
