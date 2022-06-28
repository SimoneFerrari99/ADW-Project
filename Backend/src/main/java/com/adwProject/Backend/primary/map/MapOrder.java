package com.adwProject.Backend.primary.map;

import com.adwProject.Backend.primary.dto.OrderInput;
import com.adwProject.Backend.primary.entity.Agent;
import com.adwProject.Backend.primary.entity.Customer;
import com.adwProject.Backend.primary.entity.Order;
import org.springframework.stereotype.Component;

@Component
public class MapOrder {
    public Order MapInputToOrder(OrderInput orderInput, Customer customer, Agent agent) {
        Order order = new Order();

        order.setOrdNum(orderInput.getOrdNum());
        order.setOrdAMT(orderInput.getOrdAMT());
        order.setAdvanceAMT(orderInput.getAdvanceAMT());
        order.setCustomer(customer);
        order.setAgent(agent);
        order.setOrdDescription(orderInput.getOrdDescription());

        return order;
    }
}
