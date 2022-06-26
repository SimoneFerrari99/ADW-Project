package com.adwProject.Backend.service.customer;

import com.adwProject.Backend.entity.Customer;
import com.adwProject.Backend.repository.CustomerRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CustomerServiceImpl implements CustomerService {
    private final CustomerRepository customerRepository;
    @Override
    public Customer getById(String id) {
        return customerRepository.findById(id).orElse(null);
    }
}
