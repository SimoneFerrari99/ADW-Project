package com.adwProject.Backend.primary.service.customer;

import com.adwProject.Backend.primary.entity.Customer;
import com.adwProject.Backend.primary.repository.CustomerRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

@Service
@AllArgsConstructor
public class CustomerServiceImpl implements CustomerService {
    private final CustomerRepository customerRepository;

    @RequestMapping(value="/primary")
    @Override
    public Customer getById(String id) {
        return customerRepository.findById(id).orElse(null);
    }
}
