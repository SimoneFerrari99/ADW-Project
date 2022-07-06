package com.adwProject.Backend.primary.service.customer;

import com.adwProject.Backend.primary.dto.CustomerInput;
import com.adwProject.Backend.primary.entity.Customer;
import org.springframework.data.crossstore.ChangeSetPersister;

import java.util.List;

public interface CustomerService {          //The "CustomerService" interface contains a collection of methods that will be implemented in the "CustomerServiceImpl" class
    Customer getById(String custCode);
    Customer createOrUpdateCustomer(String custCode, CustomerInput customerInput);
    List<Customer> getCustomers();
    List<Customer> getCustomersByAgentCode(String agentCode);
    Boolean deleteCustomer(String custCode);
    Boolean restoreCustomer(String custCode);

}
