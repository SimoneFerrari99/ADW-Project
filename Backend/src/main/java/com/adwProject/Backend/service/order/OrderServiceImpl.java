package com.adwProject.Backend.service.order;

import com.adwProject.Backend.entity.Order;
import com.adwProject.Backend.repository.OrderRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class OrderServiceImpl implements OrderService{
    private final OrderRepository orderRepository;

    @Override
    public Order getById(String id) {
        return orderRepository.findById(id).get();
    }

    @Override
    public List<Order> getByCustomerCustCode(String custCode) {
        List<Order> a = orderRepository.findByCustomerCustCode(custCode).get();
        System.out.println(a);                                                          //TODO: to be removed
        return a;
    }


}
