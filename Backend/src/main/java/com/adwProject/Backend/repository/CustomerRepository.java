package com.adwProject.Backend.repository;

import com.adwProject.Backend.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface CustomerRepository extends JpaRepository<Customer, String> {

    Optional<Customer> findById(String id);
    
    @Query(value = "SELECT * FROM public.customers", nativeQuery = true)
    List<Customer> get(Integer skip, Integer take);
}
