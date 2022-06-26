package com.adwProject.Backend.helper.map;

import com.adwProject.Backend.dto.OrderInput;
import com.adwProject.Backend.entity.Agent;
import com.adwProject.Backend.entity.Customer;
import com.adwProject.Backend.entity.Order;
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
