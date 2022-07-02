package com.adwProject.Backend.primary.service.customer;

import com.adwProject.Backend.primary.dto.CustomerInput;
import com.adwProject.Backend.primary.entity.Customer;
import org.springframework.data.crossstore.ChangeSetPersister;

import java.util.List;

public interface CustomerService {
    Customer getById(String id);
    Customer update(String id, CustomerInput customerInput, Boolean AllFields);
    List<Customer> getCustomersByAgentCode(String agentCode);
}
