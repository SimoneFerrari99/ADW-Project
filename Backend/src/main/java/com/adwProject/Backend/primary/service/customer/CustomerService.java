package com.adwProject.Backend.primary.service.customer;

import com.adwProject.Backend.primary.dto.CustomerInput;
import com.adwProject.Backend.primary.entity.Customer;
import org.springframework.data.crossstore.ChangeSetPersister;

import java.util.List;

public interface CustomerService {
    Customer getById(String custCode);
    Customer update(String custCode, CustomerInput customerInput, Boolean AllFields);
    List<Customer> getCustomers();
    List<Customer> getCustomersByAgentCode(String agentCode);

}
