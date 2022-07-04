package com.adwProject.Backend.primary.map;

import com.adwProject.Backend.primary.dto.CustomerInput;
import com.adwProject.Backend.primary.entity.Agent;
import com.adwProject.Backend.primary.entity.Customer;
import org.springframework.stereotype.Component;

@Component
public class MapCustomer {
    public Customer mapInputToCreateCustomer(CustomerInput customerInput, Agent agent) {
        Customer customer = new Customer();

        customer.setCustName(customerInput.getCustName());
        customer.setCustCity(customerInput.getCustCity());
        customer.setWorkingArea(customerInput.getWorkingArea());
        customer.setCustCountry(customerInput.getCustCountry());
        customer.setGrade(customerInput.getGrade());
        customer.setOpeningAMT(customerInput.getOpeningAMT());
        customer.setReceiveAMT(customerInput.getReceiveAMT());
        customer.setPaymentAMT(customerInput.getPaymentAMT());
        customer.setOutstandingAMT(customerInput.getOutstandingAMT());
        customer.setPhoneNO(customerInput.getPhoneNO());
        customer.setAgent(agent);
        customer.setActive(customerInput.getActive());

        return customer;
    }

    public void updateAllCustomerFields(Customer customer, CustomerInput customerInput, Agent agent) {
        customer.setCustName(customerInput.getCustName());
        customer.setCustCity(customerInput.getCustCity());
        customer.setWorkingArea(customerInput.getWorkingArea());
        customer.setCustCountry(customerInput.getCustCountry());
        customer.setGrade(customerInput.getGrade());
        customer.setOpeningAMT(customerInput.getOpeningAMT());
        customer.setReceiveAMT(customerInput.getReceiveAMT());
        customer.setPaymentAMT(customerInput.getPaymentAMT());
        customer.setOutstandingAMT(customerInput.getOutstandingAMT());
        customer.setPhoneNO(customerInput.getPhoneNO());
        customer.setAgent(agent);
    }

    public void updateDataCustomerFields(Customer customer, CustomerInput customerInput) {
        customer.setCustName(customerInput.getCustName());
        customer.setCustCity(customerInput.getCustCity());
        customer.setWorkingArea(customerInput.getWorkingArea());
        customer.setCustCountry(customerInput.getCustCountry());
        customer.setGrade(customerInput.getGrade());
        customer.setPhoneNO(customerInput.getPhoneNO());
    }
}
