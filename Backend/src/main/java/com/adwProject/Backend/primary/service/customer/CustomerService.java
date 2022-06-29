package com.adwProject.Backend.primary.service.customer;

import com.adwProject.Backend.primary.dto.CustomerInput;
import com.adwProject.Backend.primary.entity.Customer;
import org.springframework.data.crossstore.ChangeSetPersister;

public interface CustomerService {
    Customer getById(String id);
    Customer update(String id, CustomerInput customerInput, Boolean AllFields);
}
