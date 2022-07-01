package com.adwProject.Backend.primary.map;

import com.adwProject.Backend.primary.dto.OrderInput;
import com.adwProject.Backend.primary.entity.Agent;
import com.adwProject.Backend.primary.entity.Customer;
import com.adwProject.Backend.primary.entity.Order;
import com.adwProject.Backend.utility.Utility;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class MapOrder {
    public Order MapInputToOrder(OrderInput orderInput, Customer customer, Agent agent) {
        Order order = new Order();

        order.setOrdAMT(orderInput.getOrdAMT());
        order.setAdvanceAMT(orderInput.getAdvanceAMT());
        order.setOrdDate(Utility.getCurrentDate());
        order.setCustomer(customer);
        order.setAgent(agent);
        order.setOrdDescription(orderInput.getOrdDescription());

        return order;
    }
}
