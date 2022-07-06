package com.adwProject.Backend.primary.map;

import com.adwProject.Backend.primary.dto.OrderInput;
import com.adwProject.Backend.primary.entity.Agent;
import com.adwProject.Backend.primary.entity.Customer;
import com.adwProject.Backend.primary.entity.Order;
import com.adwProject.Backend.utility.Utility;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class MapOrder {                                                                                                 //This class is used for mutations. It helps us map incoming data from the frontend (OrderInput) to the Order
    public Order MapInputToCreateOrder(OrderInput orderInput, Customer customer, Agent agent) {                         //Method used for map incoming data to the new Order
        Order order = new Order();

        order.setOrdAMT(orderInput.getOrdAMT());
        order.setAdvanceAMT(orderInput.getAdvanceAMT());
        order.setOrdDate(Utility.getCurrentDate());
        order.setCustomer(customer);
        order.setAgent(agent);
        order.setOrdDescription(orderInput.getOrdDescription());

        return order;
    }

    public Order MapInputToUpdateOrder(OrderInput orderInput, Customer customer, Agent agent, Order order) {            //Method used for map incoming data to update data in Order

        order.setOrdAMT(orderInput.getOrdAMT());
        order.setAdvanceAMT(orderInput.getAdvanceAMT());
        order.setOrdDate(Utility.getCurrentDate());
        order.setCustomer(customer);
        order.setAgent(agent);
        order.setOrdDescription(orderInput.getOrdDescription());

        return order;
    }
}
